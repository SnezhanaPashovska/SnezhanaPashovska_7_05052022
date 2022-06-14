//Import models
const Post = require("../models/Post")
const Likes = require("../models/Likes");
const User = require("../models/User")

// 1. Like a post
exports.postLike = (req, res, next) => {
  // Find a like by post and user
  Likes.findOne({
    where:
    {
      user_id_like: req.auth.idUser,
      post_id_like: req.params.id
    }
  })
    .then((like) => {
      // If the post is already liked we remove the like
      if (like) {
        Likes.destroy({
          where:
          {
            user_id_like: req.auth.idUser,
            post_id_like: req.params.id
          }
        });
        Post.decrement(
          { likes_post: 1 },
          { where: { postId: req.params.id } }
        );
        res.status(200).json({ message: "Remove like!" })
        // If the post is not liked yet we create a like
      } else {
        Likes.create({
          user_id_like: req.auth.idUser,
          post_id_like: req.params.id
        });
        Post.increment(
          { likes_post: 1 },
          { where: { postId: req.params.id } })
        res.status(201).json({ message: "Like a post" });
      }
    })
    .catch(error => res.status(400).json({ error })
    );
};

// 2. Get all likes
exports.allLikes = (req, res, next) => {
  Likes.findAll({
    where: { post_id_like: req.params.id }
  })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};



