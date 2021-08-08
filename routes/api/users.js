const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const multer = require('multer');
const upload = multer();
/*---------- Public Routes ----------*/
router.post('/signup', upload.single('photo'), usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/friends/:dropzoneId', usersCtrl.friends)
router.get('/:username', usersCtrl.profile)
router.get('/', usersCtrl.index)


/*---------- Protected Routes ----------*/




module.exports = router;