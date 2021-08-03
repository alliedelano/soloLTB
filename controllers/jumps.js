const Jump = require('../models/dropzone');

module.exports = {
    create,
}

async function create(req, res){
    console.log(req.body)
    const jump = new Jump({...req.body});
    try {
        await jump.save()
        res.status(201).json({ jump:jump })
    } catch (err) {
        console.log(err);
        res.json({ err })
    }
}