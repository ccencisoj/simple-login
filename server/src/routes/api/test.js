const router = require("express").Router();
const upload = require("../upload");

router.post("/upload", 
  upload.single("image"), (req, res)=> {

  res.end("ok");
});

router.post("/create",
  upload.single("avatar"), (req, res)=> {

  console.log(req.body);
  console.log(req.file);

  res.end("ok");
});

module.exports = router;