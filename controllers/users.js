const User = require('../models/user');
const Dropzone = require('../models/dropzone');
const Jump = require('../models/jump')
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); 

module.exports = {
  signup,
  login,
  profile,
  index,
  friends,
  findOne
};

async function findOne(req, res){
  try {
    const friend = await User.findOne({_id: req.params.userId})
    res.status(200).json({friend: friend})
  } catch (err){
    res.json({err})
  }
}

async function friends(req, res) {
  try {
    const friends = await User.find({homeDz: req.params.dropzoneId}).sort('firstName');
    res.status(200).json({friends: friends})
  } catch (err) {
    res.json({err})
  }
}

async function index(req, res) {
  try {
    const users = await User.find({})
    res.status(200).json({ users: users})
  } catch (err) {
    res.json({err})
  }
}

function signup(req, res) {
  const filePath = `${uuidv4()}/${req.file.originalname}`
  const params = {Bucket: process.env.AWS_BUCKET, Key: filePath, Body: req.file.buffer};
  s3.upload(params, async function(err, data){
    const user = new User({...req.body, photoUrl: data.Location});
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      res.status(400).json(err);
    }



  }) 
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'Bad credentials - please try again.'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'Bad credentials - please try again.'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res){
  try {
    const date = new Date()
    const today = new Date(date.toISOString());
    const user = await User.findOne({username: req.params.username})
    if(!user) res.status(404).json({message: 'no username match'})
    const dropzone = await Dropzone.findOne({_id: user.homeDz})
    const orgJumps = await Jump.find({organizer: user._id, date: {$gte: today}}).sort('date')
    const joinedJumps = await Jump.find({'jumpers.userId': user._id, date: {$gte: today}}).sort('date')
    res.status(200).json({dropzone: dropzone, user: user, orgJumps: orgJumps, joinedJumps: joinedJumps})
  } catch(err){
    res.json({err})
  }
}


function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}
