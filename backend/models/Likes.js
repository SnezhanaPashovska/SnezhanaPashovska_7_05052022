const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
let sequelize = new Sequelize('grupomania', process.env.DB_NAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})
const User = require('./User');
const Post = require('./Post');

const Like = sequelize.define('like', {

  idlike: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})

User.hasMany(Like, { foreignKey: 'userid', sourceKey: 'idUser' });
Like.belongsTo(User, { foreignKey: 'userid', targetKey: 'idUser' });

Post.hasMany(Like, { foreignKey: 'postid', sourceKey: 'postId' });
Like.belongsTo(Post, { foreignKey: 'postid', targetKey: 'postId' });

sequelize.models.like;

module.exports = Like;

/* Like.sync().then(() => {
  console.log("Table and model synced successfully-likes")
}).catch(() => {
  console.log("Error syncing table and model")
})   */
