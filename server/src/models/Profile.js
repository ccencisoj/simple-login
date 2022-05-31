const { Schema, model, Types } = require("mongoose");

const Profile = new Schema({
  user: {type: Types.ObjectId, ref:"User", required: true},
  username: {type: String, required: true},
  avatar: {type: Types.ObjectId, ref: "Avatar", required: true}
});


Profile.set("toJSON", {
  transform: (_, returnedObject)=> {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = model("Profile", Profile);