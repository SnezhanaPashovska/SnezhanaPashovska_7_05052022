const express = require('express');
var mysql = require('mysql');
const sequelize = require ('sequelize');
const path = require('path');
const app = express();
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const profileRoutes = require('./routes/profiles');
const dotenv = require('dotenv')
dotenv.config();
app.use(sequelize);

var connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.user,
  password: process.env.password,
  database: 'grupomania',
  dialect: "mysql"
});

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting');
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/posts', profileRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;