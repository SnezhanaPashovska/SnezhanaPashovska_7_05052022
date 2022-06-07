const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/like");

const auth = require('../middleware/auth');

router.post('/posts/:id', auth, likeCtrl.postLike);
//router.get('/posts/', auth, likeCtrl.allLikes);


module.exports = router;