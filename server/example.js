const yup = require("yup");

const schema = yup.object({
  username: 
  yup.string()
  .min(4)
  .max(32)
  .required(),

  email: 
  yup.string()
  .email()
  .required(),

  password: 
  yup.string()
  .required(),
});

schema.validate({
  username: "cr",
  email: "bizapro123@gmail.com",
  password: "123"
})
.then((results)=> {
  console.log(results);
})
.catch((error)=> {
  console.log(error.message);
});