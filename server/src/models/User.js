const { Schema, model } = require("mongoose");

const User = new Schema({
  isDev: {type: Boolean, default: false},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});

User.set("toJSON", {
  transform: (_, returnedObject)=> {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.isDev;
  }
});

User.methods.sessionJSON = function() {
  return { id: this._id, email: this.email, isDev: this.isDev };
}

module.exports = model("User", User);