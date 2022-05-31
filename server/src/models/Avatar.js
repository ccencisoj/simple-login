const { Schema, model, Types } = require("mongoose");
const { address } = require("ip");
const port = process.env.PORT;

const Avatar = new Schema({
  selectable: {type: Boolean, default: false},
  path: {type: String, required: true}
});

Avatar.set("toJSON", {
  transform: (_, returnedObject)=> {
    returnedObject.url = `http://${address()}:${port}/api/avatar/${returnedObject._id}`;
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.path;
    delete returnedObject.selectable;
  }
})

module.exports = model("Avatar", Avatar);