const Jump = require('../models/jump');

module.exports = {
    create,
    index,
    findJumpers
}

async function findJumpers(req, res){
    try {
        const jump = await Jump.findById({jumpId})
        const jumpers = jump.jumpers
        res.status(200).json({ jumpers: jumpers })
    } catch (err) {
        console.log("error getting jumpers for this jump")
    }
}

async function index(req, res){
    try {
        const jumps = await Jump.find({}).populate("user").exec();
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
        console.log(jump, "this is what's going into database")
        res.status(201).json({ jump:jump })
    } catch (err) {
        console.log(err, "error in controller");
        res.json({ err })
    }
}