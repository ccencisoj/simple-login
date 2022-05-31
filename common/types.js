const yup = require("yup");
const objectId = require("bson-objectid");

const types = {};

types.object = yup
  .object;

types.Username = yup
  .string()
  .min(4)
  .max(32)
  .required();

types.Email = yup
  .string()
  .email()
  .required();

types.Password = yup 
  .string()
  .min(8)
  .max(64)
  .required();

types.ObjectId = yup
  .string()
  .test(function(value) {
    const { path, createError } = this;

    if(!value)
      return true;

    if(objectId.default.isValid(value))
      return true;

    return createError({
      path, 
      message: path ? 
      `"${path}" must be a Object id valid` :
      `the value must be a Object id valid`
    });
  });

module.exports = types;