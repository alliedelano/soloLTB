const express = require('express');
const router = express.Router();
const jumpsCtrl = require('../../controllers/jumps');
const multer = require('multer');
const upload = multer();


router.post('/', upload.none(), jumpsCtrl.create);

module.exports = router;