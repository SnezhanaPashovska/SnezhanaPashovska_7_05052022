const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like");// import of like controllers
const auth = require('../middleware/auth');

router.post('/posts/:id', auth, likeCtrl.postLike);//create a like
router.get('/posts/:id', auth, likeCtrl.allLikes);

module.exports = router;