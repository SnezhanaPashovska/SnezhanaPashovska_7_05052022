const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();
let sequelize = new Sequelize('grupomania', process.env.DB_NAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

//let sequelize = require('../config/dbConfig');

// User table

const User = sequelize.define('user', {
  idUser: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    isAdmin: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "../images/default-profile.png"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true
  },

},
  {
    timestamps: false,

  },
  {
    createdAt: false,
  },
  {
    updatedAt: false,
  }
)

sequelize.models.user;
module.exports = User;

/*  User.sync()
 .then((data) => {
  console.log("User")
}).catch((err) => {
  
}) 
 */






