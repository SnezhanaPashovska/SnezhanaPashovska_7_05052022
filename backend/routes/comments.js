const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comment')
const auth = require('../middleware/auth');

router.post('', auth, commentsCtrl.createComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;
