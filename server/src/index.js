const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL).then(()=> {
  app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
  })
})
.catch((error)=> {
  console.log(error);
});