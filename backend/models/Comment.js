const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Comment = sequelize.define('Comment', {
  idcomments: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  idposts: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    foreignKey: true
  },
  iduser: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    foreignKey: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

sequelize.models.Comment

module.exports = sequelize.model('Comment', Comment);

console.log(Comment === sequelize.models.Comment);