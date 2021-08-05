const express = require('express');
const router = express.Router();
const permissionsCtrl = require('../../controllers/permissions')
const multer = require('multer');
const upload = multer()

router.post('/', upload.none(), permissionsCtrl.create);
router.get('/:userId', permissionsCtrl.userPermissions)

module.exports = router;