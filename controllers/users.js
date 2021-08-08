const User = require('../models/user');
const Dropzone = require('../models/dropzone');
const Jump = require('../models/jump')
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
// now s3 can crud on our s3 buckets

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
    console.log('error getting user')
  }
}

async function friends(req, res) {
  try {
    const friends = await User.find({homeDz: req.params.dropzoneId}).sort('firstName');
    res.status(200).json({friends: friends})
  } catch (err) {
    console.log('error getting friends')
  }
}

async function index(req, res) {
  try {
    const users = await User.find({})
    res.status(200).json({ users: users})
  } catch (err) {
    console.log("error getting index of users")
  }
}

function signup(req, res) {
  console.log(req.body, req.file)

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  // FilePath unique name to be saved to our butckt
  const filePath = `${uuidv4()}/${req.file.originalname}`
  const params = {Bucket: process.env.AWS_BUCKET, Key: filePath, Body: req.file.buffer};
  //your bucket name goes where collectorcat is 
  //////////////////////////////////////////////////////////////////////////////////
  s3.upload(params, async function(err, data){
    console.log(data, 'from aws') // data.Location is our photoUrl that exists on aws
    const user = new User({...req.body, photoUrl: data.Location});
    try {
      await user.save();
      const token = createJWT(user); // user is the payload so this is the object in our jwt
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }



  })
  //////////////////////////////////////////////////////////////////////////////////
 
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({err: 'bad credentials'});
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res){
  console.log(req.params, "<-- req.params")
  try {
    const date = new Date()
    const today = new Date(date.toISOString());
    const user = await User.findOne({username: req.params.username})
    if(!user) res.status(404).json({message: 'no username match'})
    const dropzone = await Dropzone.findOne({_id: user.homeDz})
    const orgJumps = await Jump.find({organizer: user._id, date: {$gte: today}}).sort('date')
    const joinedJumps = await Jump.find({'jumpers.userId': user._id, date: {$gte: today}}).sort('date')
    console.log(dropzone)
    res.status(200).json({dropzone: dropzone, user: user, orgJumps: orgJumps, joinedJumps: joinedJumps})
  } catch(err){
    console.log(err, "this is an error")
    res.json({err})
  }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
