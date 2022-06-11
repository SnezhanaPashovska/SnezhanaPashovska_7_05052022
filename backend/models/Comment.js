//configuration of database
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();
let sequelize = new Sequelize('grupomania', process.env.DB_NAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

//Models
const User = require('./User')
const Post = require('./Post')

//comments table
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
  textComment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

//Foreign keys
User.hasMany(Comment, { foreignKey: 'iduser', sourceKey: 'idUser' });
Comment.belongsTo(User, { foreignKey: 'iduser', targetKey: 'idUser' });

Post.hasMany(Comment, { foreignKey: 'idposts', sourceKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'idposts', targetKey: 'postId' });

sequelize.models.comment;

module.exports = Comment;

