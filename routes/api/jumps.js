const express = require('express');
const router = express.Router();
const jumpsCtrl = require('../../controllers/jumps');
const multer = require('multer');
const upload = multer();


router.post('/', upload.none(), jumpsCtrl.create);
router.get('/', jumpsCtrl.index);

module.exports = router;