const Jump = require('../models/jump');

module.exports = {
    create,
    index
}


async function index(req, res){
    try {
        const jumps = await Jump.find({}).populate("user").exec();
        res.status(200).json({ jumps })
    } catch (err) {
        console.log("error getting index of posts")
    }
}

async function create(req, res){
    console.log(req.body)
    const jump = await Jump.create({...req.body});
    try {
        await jump.save();
        console.log(jump, "this is what's going into database")
        res.status(201).json({ jump:jump })
    } catch (err) {
        console.log(err, "error in controller");
        res.json({ err })
    }
}