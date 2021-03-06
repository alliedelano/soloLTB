const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const multer = require('multer');
const upload = multer();

router.post('/signup', upload.single('photo'), usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/friends/:dropzoneId', usersCtrl.friends)
router.get('/:username', usersCtrl.profile)
router.get('/', usersCtrl.index)
router.get('/find/:userId', usersCtrl.findOne)

module.exports = router;