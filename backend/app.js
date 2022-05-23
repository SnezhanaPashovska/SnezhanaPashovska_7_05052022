const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const nocache = require("nocache");
const dotenv = require('dotenv')
const session = require('express-session');
const bodyParser = require('body-parser');
dotenv.config();

// Routes
const userRoutes = require('./routes/user.js');
const postsRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');


// Connection to Database
const Sequelize = require('sequelize');
let sequelize = new Sequelize('grupomania', process.env.user, process.env.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})
sequelize.authenticate().then(() => {
  console.log("Sucessfully connected to mySQL DB!");
}).catch((err) => {
  console.log("Error connecting!")
})


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(nocache());

//Headers

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(helmet());
app.use((req, res, next) => {
  helmet.crossOriginResourcePolicy('same-site');
  helmet.frameguard('deny');
  helmet.hsts({ maxAge: 123456, includeSubDomains: false, preload: true });
  helmet.noSniff('noSniff');
  helmet.dnsPrefetchControl('false');
  helmet.ieNoOpen();
  helmet.referrerPolicy('strict-origin');
  helmet.xssFilter();
  helmet.crossOriginOpenerPolicy('same-origin');
  next();
});
app.disable("x-powered-by");


//Access

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);
app.use('api/comments', commentRoutes);


module.exports = app;

