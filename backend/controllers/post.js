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
    iduser: req.body.idUser,
    text: req.body.text,
    imageUrl: imageUrl,
  })
    .then(post => res.status(201).json(post))
    .catch(error => res.status(402).json({ error }));
};

// 2. Get all posts

exports.getAllPosts = (req, res) => {
  Post.findAll({ include: User })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => res.status(400).json(error))
};

// 3. Delete a post

exports.deletePost = (req, res) => {
  Post.findOne({ where: { postId: req.params.id } })
    .then(post => {
      if (post.image != null) {
        const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        })
      };
      Post.destroy({ where: { postId: req.params.id } })
        .then(() => res.status(201).json({ message: "The post has been deleted" }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

// 4. Modify a post

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
        return res.status(404).json({ error: "Post non trouvé !" });
      }

      //postIdalidation of the fields
      if (!req.body.text) {
        res.status(400).json({
          message: "Merci de bien vérifier si les champs sont tous remplis !",
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
                      .json({ message: "Post bien à jour !", post });
                  })
                  .catch((error) => res.status(402).json(error))
              )
              .catch((error) => res.status(403).json(error));
          } else {
            return res.status(401).json({ error: "Modification non autorisée !" });
          }
        })
        .catch((error) => res.status(405).json(error));
    })
    .catch((error) => res.status(407).json({ error }));
};

// 5. Get one post

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { postId: req.params.id },
    include: {
      model: User,
    },
  })
    .then((post) => {
      if (post === null) {
        return res.status(404).json({ message: "Doesn't exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

// 6. Like or dislike a post

/* exports.postLike = (req, res) => {
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
}; */

