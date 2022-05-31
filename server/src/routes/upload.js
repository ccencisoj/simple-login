const multer = require("multer");
const mime = require("mime-types");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    return cb(null, __dirname + "/upload");
  },
  filename: (req, file, cb)=> {
    const extension = mime.extension(file.mimetype);
    return cb(null, `${nanoid()}${file.originalname}.${extension}`);
  }
});

const upload = multer({ storage });

module.exports = upload;