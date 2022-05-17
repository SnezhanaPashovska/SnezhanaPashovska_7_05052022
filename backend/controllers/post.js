const Post = require('../models/Post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [''],
    usersDisliked: ['']
  });
  post.save()
    .then(() => res.status(201).json({ message: 'The post has been added !' }))
    .catch(error => res.status(400).json({ error }));
};

//--Like and dislike--//
exports.likeOrDislikePost = (req, res, next) => {
  let like = req.body.like
  let iduser = req.body.iduser
  let idposts = req.params.id

  switch (like) {
    case 1:
      Post.updateOne({ _id: idposts }, { $push: { usersLiked: iduser }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: "Like" }))
        .catch((error) => res.status(400).json({ error }))
      break;

    case 0:
      Post.findOne({ _id: idposts })
        .then((post) => {
          if (post.usersLiked.includes(iduser)) {
            Post.updateOne({ _id: idposts }, { $pull: { usersLiked: iduser }, $inc: { likes: -1 } })
              .then(() => res.status(200).json({ message: "Neutral" }))
              .catch((error) => res.status(400).json({ error }))
          }
          if (post.usersDisliked.includes(iduser)) {
            Post.updateOne({ _id: idposts }, { $pull: { usersDisliked: iduser }, $inc: { dislikes: -1 } })
              .then(() => res.status(200).json({ message: "Neutral" }))
              .catch((error) => res.status(400).json({ error }))
          }
        })
        .catch((error) => res.status(404).json({ error }))
      break;

    case -1:
      Post.updateOne({ _id: idposts }, { $push: { usersDisliked: iduser }, $inc: { dislikes: +1 } })
        .then(() => { res.status(200).json({ message: "Dislike" }) })
        .catch((error) => res.status(400).json({ error }))
      break;

    default:
      console.log(error);
  }
};
//--GET a post--//

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error: error }));
};

//--Modify a post--//

exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.iduser !== req.auth.iduser)
        res.status(403).json({ error: "Unauthorized request!" });
    })
  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'The post has been modified !' }))
    .catch(error => res.status(400).json({ error }));
};

//--Delete a post--//

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'The post has been deleted !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//--GET all of the posts--//

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error: error }));
};

