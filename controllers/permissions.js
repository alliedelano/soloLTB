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
        console.log(err, "error in controller");
        res.json({ err })
    }
}

async function userPermissions(req, res){
    console.log('hit permissions function')
    const permissions = await Permission.find({userId: req.params.userId})
    console.log(permissions)
    res.status(200).json({ permissions: permissions })
}