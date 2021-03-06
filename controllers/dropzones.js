const Dropzone = require('../models/dropzone');

module.exports = {
    create,
    index,
    findOne
}

async function create(req, res){
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
        const dropzones = await Dropzone.find({}).sort('name');
        res.status(200).json({ dropzones })
    } catch (err) {
        res.json({err})
    }
}

async function findOne(req, res){
    try {
        const dropzone = await Dropzone.findOne({_id: req.params.id})
        console.log(dropzone)
        res.status(200).json({dropzone: dropzone})
    } catch (err){
        res.json({err})
    }
}
