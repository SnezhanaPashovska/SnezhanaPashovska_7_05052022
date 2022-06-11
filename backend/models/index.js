//database configuration
const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');
//database data
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.user,
  dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port
},
);

sequelize.authenticate().then(() => {
  console.log("Sucessfully connected to mySQL DB!");
}).catch((err) => {
  console.log("Error connecting!")
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//models required
db.comments = require('./Comment.js')
db.likes = require('./Likes.js');
db.posts = require('./Post.js');
db.users = require('./User.js');
//sync the database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("SYNCED")
  }).catch(() => {
    console.log("NOT SYNCED")
  });

module.exports = db;
