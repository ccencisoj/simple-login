const LoginError = require("../../errors/LoginError");
const ValueError = require("../../errors/ValueError");
const router = require("express").Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const types = require("../types");
const validate = require("../validate");
const Avatar = require("../../models/Avatar");

router.post("/create", 
  validate.body({
    username: types.Username.required(),
    email: types.Email.required(),
    password: types.Password.required(),
    avatar: types.ObjectId.required(),
  }), 
  async (req, res)=> {

  const passwordHash = bcrypt.hashSync(
    req.body.password, 8);
    
  const user = await User.create({
    email: req.body.email,
    password: passwordHash,
  });

  const existsAvatar = await Avatar.exists({
    _id: req.body.avatar
  });

  if(!existsAvatar)
    throw new ValueError("'avatar' is not found");

  await Profile.create({
    user: user._id,
    avatar: req.body.avatar,
    username: req.body.username,
  });
  
  req.session.user = user.sessionJSON();

  res.json({ user });
});

router.post("/login", 
  validate.body({
    email: types.Email.required(),
    password: types.Password.required()
  }),
  async (req, res)=> {

  const user = await User.findOne({
    email: req.body.email
  });

  if(!user) 
    throw new LoginError("Email or password is incorrect");
    
  if(!(bcrypt.compareSync(
    req.body.password, user.password)))
    throw new LoginError("Email or password is incorrect");

  req.session.user = user.sessionJSON();
  
  res.json({ user });
});

router.get("/logout", (req, res)=> {
  req.session.destroy();
  res.end("ok");
});

router.get("/current",
  auth.required, (req, res)=> {      
  res.json({ user: req.payload.user });
});

module.exports = router;