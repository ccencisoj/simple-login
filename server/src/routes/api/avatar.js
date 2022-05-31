const router = require("express").Router();
const upload = require("../upload");
const auth = require("../auth");
const types = require("../types");
const validate = require("../validate");
const Avatar = require("../../models/Avatar");
const NoFoundError = require("../../errors/NoFoundError");

router.post("/upload", 
  upload.single("avatar"),
  validate.file({empty: false}), 
  async (req, res)=> {
  
  const isDeveloper = true;
  const { path } = req.file;

  const avatar = await Avatar.create({
    path,
    selectable: isDeveloper ? true : false
  });

  res.json({ avatar });
});

router.post("/update", 
  upload.single("image"),
  validate.file({empty: false}),
  validate.body({
    avatarId: types.ObjectId.required()
  }),   
  async (req, res)=> {
  
  const avatar = await Avatar.findOne({
    _id: req.body.avatarId
  });

  if(!avatar)
    return new NoFoundError(`El recurso 
    no ha sido encontrado`);
  
  avatar.path = req.file.path;
  await avatar.save();
  
  res.json({ avatar });
});

router.get("/selectables",
  async (req, res)=> {

  const avatars = await Avatar.find({
    selectable: true
  });

  res.json({ avatars });
});

router.get("/:avatarId", 
  validate.params({
    avatarId: types.ObjectId
  }), 
  async (req, res)=> {

  const avatar = await Avatar.findOne({
    _id: req.params.avatarId
  });
  
  if(!avatar)
    throw new NoFoundError(`El recurso solicitado 
    no se encuentra disponible`);
  
  res.sendFile(avatar.path);
});

router.delete("/:avatarId", 
  auth.requiredDev,
  validate.params({
    avatarId: types.ObjectId
  }),
  async (req, res)=> {

  await Avatar.deleteOne({
    _id: req.params.avatarId
  });

  res.end("ok");
});

module.exports = router;