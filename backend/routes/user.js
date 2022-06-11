const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');//omport user controllers
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const checkPassword = require('../middleware/password-validator');
const checkEmail = require('../middleware/email-validation');
const rateLimit = require('../middleware/passwordEntryLimit');

router.post('/signup', checkPassword, checkEmail, userCtrl.signup);//user sign up
router.post('/login', rateLimit, userCtrl.login);//user log in
router.delete('/:id', auth, userCtrl.deleteUser);//delete a user
router.get('/all', auth, userCtrl.getAllUsers);//get all users
router.get('/:id', auth, multer, userCtrl.getOneUser);//get one user
router.put('/:id', auth, multer, userCtrl.updateUser);//update a user

module.exports = router;