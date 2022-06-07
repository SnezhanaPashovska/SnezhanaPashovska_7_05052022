const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, postsCtrl.createPost);
router.get('/', auth, postsCtrl.getAllPosts);
router.get("/:id", auth, postsCtrl.getOnePost);
router.delete('/:id', auth, postsCtrl.deletePost);
router.put("/:id", auth, multer, postsCtrl.modifyPost);

module.exports = router;