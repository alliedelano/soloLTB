const Dropzone = require('../models/dropzone');

module.exports = {
    create,
    index
}

async function create(req, res){
    console.log(req.body, "<-- controller create")
    const dropzone = new Dropzone({...req.body});
    try {
        await dropzone.save()
        res.status(201).json({ dropzone: dropzone })
    } catch (err) {
        console.log(err);
        res.json({ err })
    }

}

async function index(req, res){
    try {
        const dropzones = await Dropzone.find({});
        res.status(200).json({ dropzones })
    } catch (err) {}
}