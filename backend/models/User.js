const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();
let sequelize = new Sequelize('grupomania', process.env.user, process.env.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

// User table

const User = sequelize.define('user', {
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
    allowNull: true,
    defaultValue:0
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

  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0
  }
})

sequelize.models.user;
module.exports = User;

/* User.sync().then((data) => {
  console.log("Connected")
}).catch((err) => {
  
})
 */






