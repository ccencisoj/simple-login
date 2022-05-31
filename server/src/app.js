const express = require("express");
const cors = require("cors");
const app = express();
const consoleError = require("./utils/consoleError");

const isProduction = process.env.NODE_ENV === "production";

const routes = require("./routes");
const session = require("express-session");

app.use(cors({
  credentials: true,
  origin: [
    "http://192.168.100.6:3000",
    "http://192.168.100.6:3000/",
  ]
}));

app.use(session({
  secret: "cat",
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());
app.use(routes);

app.use((error, req, res, next)=> {
  let errorObject = null;

  if(error.toJSON) 
    errorObject = error.toJSON();

  if(!error.toJSON && isProduction)
    errorObject = {
      status: 500,
      name: "UnknownError",
      message: "Unknown Error"
    }
  
  if(!error.toJSON && !isProduction)
    errorObject = {
      status: 500,
      name: error.name,
      message: error.message
    }

  if(!isProduction) 
    consoleError(errorObject);

  res.status(errorObject.status || 500).send(errorObject);
});

module.exports = app;