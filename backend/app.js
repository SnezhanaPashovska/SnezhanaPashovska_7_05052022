//General imports
const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const nocache = require("nocache");
const dotenv = require('dotenv')
//const session = require('express-session');
const bodyParser = require('body-parser');
dotenv.config();

// Routes
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require("./routes/comments")
const likeRoutes = require("./routes/like");


// Connection to Database
const Sequelize = require('sequelize');
const mysql = require('mysql2');
let sequelize = new Sequelize('grupomania', process.env.DB_NAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
})
sequelize.authenticate()
  .then(() => {
    console.log("Sucessfully connected to mySQL DB!");
  }).catch((err) => {
    console.log("Error connecting!")
  })


app.use(express.json());
const cors = require('cors');

// Import cors to secure API access, reserved here for localhost:8080
let corsOptions = {
  origin: 'http://localhost:8080'
};


app.use(bodyParser.json());

//Security
app.use(nocache());
app.use(helmet());
app.use((req, res, next) => {
  helmet.crossOriginResourcePolicy();
  helmet.frameguard();
  helmet.hsts();
  helmet.noSniff();
  helmet.dnsPrefetchControl();
  helmet.ieNoOpen();
  helmet.referrerPolicy();
  helmet.xssFilter();
  helmet.crossOriginOpenerPolicy();
  next();
});
app.disable("x-powered-by");


app.use(cors(corsOptions));

//Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-API-KEY');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});


//Access
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);
app.use("/api/comment", commentsRoutes);
app.use('/api/likes', likeRoutes);

module.exports = app;

