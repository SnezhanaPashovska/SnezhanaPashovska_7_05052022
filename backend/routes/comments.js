const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comment") //import "comment" controller
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", auth, multer, commentsCtrl.createComment); //create a comment
router.get("/allcomments/:postid", auth, commentsCtrl.getAllComments); //get all comments
router.delete('/posts/:postid/:id', auth, commentsCtrl.deleteComment); //delete a commment

module.exports = router;
