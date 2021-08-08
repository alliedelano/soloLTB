const Jump = require('../models/jump');

module.exports = {
    addJumper,
    deleteJumper,
    addFriend
}

async function addFriend(req, res){
    try {
        const jump = await Jump.findById(req.params.id);
        jump.jumpers.push({...req.body})
        await jump.save()
        res.status(201).json({data: 'added friend'})
    } catch (err){
        res.json({data: err})
    }
}

async function addJumper(req, res){
    try{
        const jump = await Jump.findById(req.params.id);
        jump.jumpers.push({username: req.user.username, userId: req.user._id, userAvatar: req.user.photoUrl});
        await jump.save()
        res.status(201).json({data: 'added jumper'})
    } catch(err){
        res.json({data: err})
    }
}

async function deleteJumper(req, res){
    try {
        const jump = await Jump.findOne({'jumpers._id': req.params.id, 'jumpers.username': req.user.username});
        jump.jumpers.remove(req.params.id);
        await jump.save()
        res.json({data: 'jumper removed'})
    } catch(err){
        res.json({error: error})
    }
}

