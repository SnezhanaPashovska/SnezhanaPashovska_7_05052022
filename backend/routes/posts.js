const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/post');// import of post controllers
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postsCtrl.createPost);//create a post
router.get('/', auth, postsCtrl.getAllPosts);//get all posts
router.get("/:id", auth, postsCtrl.getOnePost);//get one post
router.delete('/:id', auth, postsCtrl.deletePost);//delete a post
router.put("/:id", auth, multer, postsCtrl.modifyPost);//modify a post

module.exports = router;