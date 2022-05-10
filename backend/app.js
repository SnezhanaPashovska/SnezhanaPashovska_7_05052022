const express = require('express');
var mysql = require('mysql');
const app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mojata1lozinka!',
  database: 'grupomania'
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

module.exports = app;