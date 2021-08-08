const express = require('express');
const router = express.Router();
const jumpersCtrl = require('../../controllers/jumpers')

router.post('/jumps/:id/jumpers', jumpersCtrl.addJumper);
router.delete('/jumpers/:id', jumpersCtrl.deleteJumper)
router.post('/jumps/:id/addFriend', jumpersCtrl.addFriend)



module.exports = router;