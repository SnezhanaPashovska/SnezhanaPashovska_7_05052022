const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const connection = require("../app")

const Profile = sequelize.define('Profile', {
  idUser: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.models.Profile

module.exports = sequelize.model('Profile', Profile);

console.log(Profile === sequelize.models.Profile);