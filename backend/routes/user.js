const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const checkPassword = require('../middleware/password-validator');
const checkEmail = require('../middleware/email-validation');
const rateLimit = require('../middleware/passwordEntryLimit');


router.post('/signup', checkPassword, checkEmail, userCtrl.signup);
router.post('/login', rateLimit, userCtrl.login);
router.put('/', auth, multer, userCtrl.updateUser);
router.put('/image', auth, multer, userCtrl.updateImage)
router.delete('/:id', auth, userCtrl.deleteUser);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);

module.exports = router