const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comment")

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", auth, multer, commentsCtrl.createComment);
router.get("/allcomments/:postid", auth, commentsCtrl.getAllComments);
router.delete('/posts/:postid/:id', auth, commentsCtrl.deleteComment);

module.exports = router;
