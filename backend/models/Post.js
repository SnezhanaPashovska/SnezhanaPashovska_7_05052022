const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Post = sequelize.define('Post', {
  idposts: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  iduser: {
    type: DataTypes.INTEGER,
    foreignKey: true,
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
  likes: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  dislikes: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  usersLiked: {
    type: DataTypes.ARRAY(DataTypes.NUMBER),
    allowNull: false
  },
  usersDisliked: {
    type: DataTypes.ARRAY(DataTypes.NUMBER),
    allowNull: false
  }
})

sequelize.models.Post

module.exports = sequelize.model('Post', Post);

console.log(Post === sequelize.models.Post);