const fs = require('fs');
const User = require("../models/User");
const Post = require("../models/Post");

// 1. Create a Post

exports.createPost = (req, res) => {
  let imageUrl = "";
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  };
  Post.create({
    idUser: req.body.idUser,
    text: req.body.text,
    imageUrl: imageUrl,
  })
    .then(post => res.status(201).json(post))
    .catch(error => res.status(400).json({ error }));
};

// 2. Get all posts

exports.getAllPosts = (req, res) => {
  try {
    Post.findAll({ include: User })
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => res.status(400).json(error))
  } catch {
    error => res.status(500).json(error);
  }
};

// 3. Delete a post

exports.deletePost = (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (post.image != null) {
        const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        })
      };
      Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(201).json({ message: "The post has been deleted" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

// 4. Like or dislike a post

exports.postLike = (req, res) => {
  Like.findOne({
    where: {
      idUser: req.body.idUser,
      postId: req.body.postId
    }
  })
    .then(response => {
      if (response == null) {
        if (req.body.likeValue == 1) {
          Like.create({
            idUser: req.body.idUser,
            postId: req.body.postId,
            like: req.body.likeValue
          });
          Post.increment(
            { liked: 1 },
            { where: { id: req.body.postId } }
          );
          res.status(201).json({ message: 'Liked!' })
        }
        else if (req.body.likeValue == -1) {
          Like.create({
            idUser: req.body.idUser,
            postId: req.body.postId,
            like: req.body.likeValue
          });
          Post.increment(
            { dislike: 1 },
            { where: { id: req.body.postId } }
          );
          res.status(201).json({ message: 'Dislike!' })
        }
      }

      else if (response.dataValues.liked == 1) {
        if (req.body.likeValue == -1) {
          Like.update(
            { liked: -1 },
            { where: { [Seq.and]: [{ postId: req.body.postId }, { idUser: req.body.idUser }] } }
          );
          Post.increment(
            { dislikes: 1 },
            { where: { id: req.body.postId } }
          );
          Post.decrement(
            { likes: 1 },
            { where: { id: req.body.postId } }
          );
          res.status(201).json({ message: "Neutral" });
        }
        else {
          Like.destroy(
            { where: { [Seq.and]: [{ postId: req.body.postId }, { idUser: req.body.idUser }] } }
          );
          Post.decrement(
            { likes: 1 },
            { where: { id: req.body.postId } }
          );
          res.status(201).json({ message: "The like has been removed" })
        };
      }

      else if (response.dataValues.liked == -1) {
        if (req.body.likeValue == 1) {
          Like.update(
            { liked: 1 },
            { where: { [Seq.and]: [{ postId: req.body.postId }, { idUser: req.body.idUser }] } }
          );
          Post.increment(
            { likes: 1 },
            { where: { id: req.body.postId } }
          );
          Post.decrement(
            { dislikes: 1 },
            { where: { id: req.body.postId } }
          );
          res.status(201).json({ message: "Neutral" })
        }
        else {
          Like.destroy(
            { where: { [Seq.and]: [{ postId: req.body.postId }, { idUser: req.body.idUser }] } }
          );
          Post.decrement(
            { dislikes: 1 },
            { where: { id: req.body.postId } }
          );
          res.status(201).json({ message: "The dislike has been removed" })
        };
      }
    })
    .catch(error => res.status(400).json({ error }));
};