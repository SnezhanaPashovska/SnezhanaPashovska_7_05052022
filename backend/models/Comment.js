const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();
let sequelize = new Sequelize('grupomania', process.env.user, process.env.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

const User = require('./User')
const Post = require('./Post')


//Comment table

const Comment = sequelize.define('comment', {
  idcomments: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  idposts: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Hello from vs studio'
  },
})

User.hasMany(Comment, { foreignKey: 'iduser', sourceKey: 'idUser' });
Comment.belongsTo(User, { foreignKey: 'iduser', targetKey: 'idUser' });

Post.hasMany(Comment, { foreignKey: 'idposts', sourceKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'idposts', targetKey: 'postId' });

sequelize.models.comment;

module.exports = Comment;
/* 
Comment.sync().then(() => {
  console.log("SYNCED")
}).catch(() => {
  console.log("NOT SYNCED")
}) */
