const Permission = require('../models/permission')

module.exports = {
    create,
    userPermissions
}

async function create(req, res){
    const permission = await Permission.create({...req.body});
    try {
        await permission.save();
        res.status(201).json({ permission: permission })
    } catch (err) {
        res.json({ err })
    }
}

async function userPermissions(req, res){
    const permissions = await Permission.find({userId: req.params.userId, type: 'admin'})
    res.status(200).json({ permissions: permissions })
}