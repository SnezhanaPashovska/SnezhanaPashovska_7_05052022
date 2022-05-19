const Comment = require("../models");

// 1. Create a comment

exports.createComment = (req, res) => {
  const newComment = {
    idUser: req.body.idUser,
    text: req.body.text,
    idposts: req.body.idposts
  };
  Comment.create(newComment)
    .then(() => res.status(201).json({ message: "The comment has been added" }))
    .catch(error => res.status(500).json({ error }));
};

// 2. Delete a comment

exports.deleteComment = (req, res) => {
  Comment.destroy(
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ message: "The comment has been deleted" }))
    .catch(error => res.status(500).json({ error }));
};