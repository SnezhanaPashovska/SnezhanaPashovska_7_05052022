const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, postsCtrl.createPost);
router.get('/', auth, postsCtrl.getAllPosts);
router.delete('/:id', auth, postsCtrl.deletePost);
router.post('/like', auth, postsCtrl.postLike);

module.exports = router;