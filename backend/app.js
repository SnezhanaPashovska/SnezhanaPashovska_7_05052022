// General imports
const express = require('express'); //to create web apps with node
const path = require('path');  // give access to the file path
const app = express(); // call the "Express" module with its function

// secure http headers
const helmet = require('helmet');

// clean up user supplied data to prevent injection.
let sqlSanitizer = require('sql-sanitizer');

// prevent cache stocking to prevent vulnerabilities
const nocache = require('nocache');

// to hide database sensitive info
const dotenv = require('dotenv')
dotenv.config();

//cache control-middleware to set url cache options with globs
const cache = require('cache-control');
app.use(cache({
  '/index.html': 1000,
  '/none/**/*.html': false,
  '/private.html': 'private, max-age=300',
  '/**': 500, // Default to caching all items for 500
}));

// import routes
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments')
const likeRoutes = require('./routes/like');

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

// global middleware, transforms the request body into a usable javascript object
app.use(express.json());

// Import cors to secure API access, reserved here for localhost:8080
const cors = require('cors');
let corsOptions = {
  origin: 'http://localhost:8080'
};
app.use(cors(corsOptions));

//Security
app.use(sqlSanitizer);
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

//Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-API-KEY');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cache-Control', 'public, max-age=31557600, s-maxage=31557600');//cache control, 1 year
  next();
});


//Access
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comment', commentsRoutes);
app.use('/api/likes', likeRoutes);

module.exports = app;

