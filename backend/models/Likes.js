const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
let sequelize = new Sequelize('grupomania', process.env.DB_NAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})


const Like = sequelize.define('like', {

  id_likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  user_id_like: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  post_id_like: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
  {
    timestamps: false
  }
)



sequelize.models.like;

module.exports = Like;

/* Like.sync().then(() => {
  console.log("Table and model synced successfully-likes")
}).catch(() => {
  console.log("Error syncing table and model")
})  */
