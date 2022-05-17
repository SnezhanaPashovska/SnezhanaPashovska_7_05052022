const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const profilesCtrl = require('../controllers/profile');

router.get('/', profilesCtrl.findProfiles);
router.post('/', multer, profilesCtrl.addProfile);
router.get('/:id', profilesCtrl.findProfileById);
router.put('/:id', multer, profilesCtrl.updateProfile);
router.delete('/:id', profilesCtrl.deleteById);

module.exports = router;