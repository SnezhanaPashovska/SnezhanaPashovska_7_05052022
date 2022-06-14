//configuration of database
const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();
let sequelize = new Sequelize('grupomania', process.env.DB_NAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

const User = require('./User');
const Likes = require('./Likes')

// post table
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
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: true
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: 0
  },
  likes_post: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
},
  {
    timestamps: true,
  },
  {
    createdAt: true,
  },
  {
    updatedAt: false,
  }
)

//Foreign keys
User.hasMany(Post, { foreignKey: 'iduser', sourceKey: 'idUser' });
Post.belongsTo(User, { foreignKey: 'iduser', targetKey: 'idUser' });

User.hasMany(Likes, { foreignKey: 'user_id_like', sourceKey: 'idUser' });
Likes.belongsTo(User, { foreignKey: 'user_id_like', targetKey: 'idUser' });

Post.hasMany(Likes, { foreignKey: 'post_id_like', sourceKey: 'postId' });
Likes.belongsTo(Post, { foreignKey: 'post_id_like', targetKey: 'postId' });

sequelize.models.post;

module.exports = Post;
