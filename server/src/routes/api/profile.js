const router = require("express").Router();
const validate = require("../validate");
const auth = require("../auth");
const types = require("../types");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.get("/current", 
  auth.required, async (req, res)=> {

  const profile = await Profile.findOne({
    user: req.payload.user.id
  })
  .populate("user")
  .populate("avatar");

  res.json({ profile });
});
 
router.post("/update", 
  auth.required,
  validate.body({
    username: types.Username.required(),
    email: types.Email.required()
  }),
  async (req, res)=> {

  const user = await User.findOne({
    _id: req.payload.user.id
  });

  user.email = req.body.email;
  await user.save();

  const profile = await Profile.findOne({
    user: user.id
  })
  .populate("user")
  .populate("avatar");

  profile.username = req.body.username;
  await profile.save();
  
  res.json({ profile });
});

module.exports = router;