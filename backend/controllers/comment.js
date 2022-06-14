const Comment = require("../models/Comment");
const User = require("../models/User");
const Post = require("../models/Post")

// 1. Create a comment
exports.createComment = (req, res, next) => {
  if (!req.body.postId || !req.body.idUser || !req.body.textComment) {
    res.status(400).json({ message: "Please check that the fields are all filled in !" });
    return;
  }
  Comment.create({
    idposts: req.body.postId,
    iduser: req.body.idUser,
    textComment: req.body.textComment,
  })
    .then((comment) =>
      res.status(201).json({ message: "Comment added!", comment })
    )
    .catch((error) => res.status(400).json({ error }));
};

// 2. Get a comment
exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    where: {
      idposts: req.params.postid,
    },
    include: {
      model: User,
      attributes: {
        exclude: ["id", "password", "email", "createdAt", "updatedAt"],
      },
    },
    order: [["createdAt", "DESC"]],
  })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(405).json({ error }));
};

// 3. Delete a comment
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { idcomments: req.params.id } })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ error: "Comment not found!" });
      }
      //check whoever wants to the comment is the author of the comment or the administrator
      User.findOne({ where: { idUser: req.auth.idUser } })
        .then((user) => {
          if (!user.isAdmin && req.auth.idUser != comment.iduser) {
            return res
              .status(401)
              .json({ error: "Unauthorized !" });
          }
        })
        .catch((error) => res.status(409).json({ error }));

      Comment.destroy({ where: { idcomments: req.params.id } })
        .then(() => res.status(200).json({ message: "The comment hasn't been deleted !" })
        )
    })

    .catch((error) => res.status(403).json({ error }));
};