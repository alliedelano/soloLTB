const express = require('express');
const router = express.Router();
const dropzonesCtrl = require('../../controllers/dropzones');

router.post('/', dropzonesCtrl.create);
router.get('/', dropzonesCtrl.index); 
router.get('/:id', dropzonesCtrl.findOne)

module.exports = router;