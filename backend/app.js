const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv')
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


//Headers

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});


//Access

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);
app.use('api/comments', commentRoutes);


module.exports = app;

