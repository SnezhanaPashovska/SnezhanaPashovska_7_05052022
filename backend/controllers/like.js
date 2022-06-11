const Post = require("../models/Post")
const Likes = require("../models/Likes");
const User = require("../models/User")

// 1. Like a post
exports.postLike = (req, res, next) => {
  // Find a like
  Likes.findOne({
    where:
    {
      user_id_like: req.auth.idUser,
      post_id_like: req.params.id
    }
  })
    .then((like) => {
      // If the post is already liked
      if (like) {
        Likes.destroy({
          where:
          {
            user_id_like: req.auth.idUser,
            post_id_like: req.params.id
          }
        });
        res.status(200).json({ message: "Like -!" })
        // If the post is not liked yet
      } else {
        Likes.create({
          user_id_like: req.auth.idUser,
          post_id_like: req.params.id
        });
        res.status(201).json({ message: "Like" });
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



