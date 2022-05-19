const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();
let sequelize = new Sequelize('grupomania', process.env.user, process.env.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

const User = require('./User');


// Post table

const Post = sequelize.define('post', {
  postId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  dislike: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
}
})

User.hasMany(Post, { foreignKey: 'iduser', sourceKey: 'idUser' });
Post.belongsTo(User, { foreignKey: 'iduser', targetKey: 'idUser' });




sequelize.models.post;

module.exports = Post;

/* Post.sync().then((data)=>{
  console.log("Table and model synced successfully-Post")
}).catch((err)=>{
  console.log("Error syncing table and model-Post")
})   */

