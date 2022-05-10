import { Sequelize, Model, DataTypes } from 'sequelize';
const sequelize = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define("User", {
  id: DataTypes.STRING,
  firstName: {
    type: DataTypes.STRING,
    required: true
  },
  lastName: {
    type: DataTypes.STRING,
    required: true
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    required: true
  },
})

console.log(User);

module.exports = User;