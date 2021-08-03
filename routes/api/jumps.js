const express = require('express');
const router = express.Router();
const jumpsCtrl = require('../../controllers/jumps');

router.post('/', jumpsCtrl.create);