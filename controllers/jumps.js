const Jump = require('../models/jump');

module.exports = {
    create,
    index,
    findJumpers,
    deleteJump
}


async function findJumpers(req, res){
    try {
        const jump = await Jump.findById(req.params.jumpId)
        const jumpers = jump.jumpers
        res.status(200).json({ jump: jump, jumpers: jumpers })
    } catch (err) {
        console.log("error getting jumpers for this jump")
        res.json({err})
    }
}

async function index(req, res){
    try {
        const date = new Date()
        const today = new Date(date.toISOString());
        const jumps = await Jump.find({date: {$gte: today}, dropzone: req.user.homeDz}).sort('date').populate("user").exec();
        res.status(200).json({ jumps })
    } catch (err) {
        console.log("error getting index of jumps")
    }
}

async function create(req, res){
    console.log(req.body)
    const jump = await Jump.create({...req.body});
    jump.jumpers.push({username: req.user.username, userId: req.user._id, userAvatar: req.user.photoUrl});
    try {
        await jump.save();
        res.status(201).json({ jump:jump })
    } catch (err) {
        console.log(err, "error in controller");
        res.json({ err })
    }
}

async function deleteJump(req, res){
    try {
        console.log(req.params.jumpId)
        await Jump.findByIdAndRemove(req.params.jumpId)
        res.json({data: 'jump removed'})
    } catch(err){
        console.log(err, "error deleting jump")
    }
}