const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

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

db.comments = require('./Comment.js')
db.likesdislikes = require('./Likes.js');
db.posts = require('./Post.js');
db.users = require('./User.js');

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("SYNCED")
  }).catch(() => {
    console.log("NOT SYNCED")
  });

module.exports = db;
