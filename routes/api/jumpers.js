const express = require('express');
const router = express.Router();
const jumpersCtrl = require('../../controllers/jumpers')
const multer = require('multer');
const upload = multer();

router.post('/jumps/:id/jumpers', jumpersCtrl.addJumper);
router.delete('/jumpers/:id', jumpersCtrl.deleteJumper)
router.post('/jumps/:id/addFriend', upload.none(), jumpersCtrl.addFriend)



module.exports = router;