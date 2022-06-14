const fs = require('fs');
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Likes');

// 1. Create a Post
exports.createPost = (req, res) => {
  //if the post contains an image
  let imageUrl = "";
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  };
  //validation of fields
  if (!req.body.text && !req.body.imageUrl || !req.body.idUser) {
    res.status(400).json({
      message: "Please check if all the fields are filled in correctly !",
    });
    return;
  }
  //saving the post in database
  Post.create({
    iduser: req.body.idUser,
    text: req.body.text,
    imageUrl: imageUrl,
  })
    .then(post => res.status(201).json(post))
    .catch(error => res.status(400).json({ error }));
};

// 2. Get all posts
exports.getAllPosts = (req, res) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ["firstname", "lastname", "photoUrl"]
    },
    //filter by date, the latest is first
    order: [["createdAt", "DESC"]],
  }).then(posts => {
    res.status(200).json(posts);
  }).catch(error => res.status(400).json(error))
};

// 3. Get all posts of a user
exports.getAllPostsOfUser = (req, res, next) => {
  Post.findAll({
    where: { iduser: req.params.id },
    include: {
      model: User,
      attributes: ["nom", "prenom", "photo"]
    },
    order: [["createdAt", "DESC"]]
  })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

// 4. Delete a post
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "The post hasn't been found !" });
      }
      //check whoever wants to the post is the author of the post or the administrator
      User.findOne({ where: { idUser: req.auth.idUser } })
        .then((user) => {
          if (!user.isAdmin && req.auth.idUser != post.iduser) {
            return res.status(406).json({ error: "Cannot delete post !" });
          }
        })
        .catch((error) => res.status(402).json({ error }));

      const filename = post.imageUrl.split("/images/")[1];
      // 1st arg: the url of the file, 2nd arg: deleting the image
      fs.unlink(`images/${filename}`, () => {
        // deleting the post from the database
        Post.destroy({ where: { postId: req.params.id } })
          .then((user) => res.status(200).json({ message: "The post has been deleted !" }))
          .catch((error) => res.status(401).json({ error }));
      });
    })
    .catch((error) => res.status(405).json({ error }));
};

// 5. Modify a post
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ? {
    ...req.body, imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  } : { ...req.body };

  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      if (req.file) {
        const oldFilename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${oldFilename}`, (error) => {
          console.log(error);
        });
      }
      //Checking if the post exist
      if (!post) {
        return res.status(404).json({ error: "Post hasn't been found !" });
      }
      //postId - validation of the fields
      if (!req.body.text) {
        res.status(400).json({
          message: "Please make sure that all fields are filled in !",
        });
        return;
      }
      User.findOne({ where: { idUser: req.auth.idUser } })
        .then((user) => {
          //Verification if the post is beeing modified by the creator or the administrator
          if (user.isAdmin || req.auth.iduser === post.id) {
            // Update of the database
            Post.update(
              { ...postObject, postId: req.params.id },
              { where: { postId: req.params.id } }
            )
              .then((post) =>
                // If the modification is successful
                Post.findOne({ where: { postId: req.params.id } })
                  .then((post) => {
                    // Getting the updated post
                    res
                      .status(200)
                      .json({ message: "The post has been updated !", post });
                  })
                  .catch((error) => res.status(400).json(error))
              )
              .catch((error) => res.status(403).json(error));
          } else {
            return res.status(404).json({ error: "Unauthorized !" });
          }
        })
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json({ error }));
};

// 6. Get one post
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { postId: req.params.id },
    include: {
      model: User,
      attributes: ["firstname", "lastname", "photoUrl"]
    },
  })
    .then((post) => {
      //if the post does not exist
      if (post === null) {
        return res.status(404).json({ message: "Doesn't exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
