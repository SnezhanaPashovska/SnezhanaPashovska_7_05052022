const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const checkPassword = require('../middleware/password-validator');
const checkEmail = require('../middleware/email-validation');
//const rateLimit = require('../middleware/passwordEntryLimit');


router.post('/signup', checkPassword, checkEmail, userCtrl.signup);
router.post('/login', /* rateLimit */ userCtrl.login);
router.put('/image', auth, multer, userCtrl.updateImage)
router.delete('/profile/:id', auth, userCtrl.deleteUser);
router.get('/all', auth, userCtrl.getAllUsers);
router.get('/:id', auth, multer, userCtrl.getOneUser);
router.put('/:id', auth, multer, userCtrl.updateUser);

module.exports = router;