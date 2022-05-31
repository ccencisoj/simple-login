const AuthError = require("../errors/AuthError");

const required = (req, res, next)=> {
  const session = req.session || {};
  const user = session.user;

  if(!user) 
    throw new AuthError("Authentication required");

  req.payload = {user};
  next();
}

const requiredDev = (req, res, next)=> {
  const session = req.session || {};
  const user = session.user;

  console.log(req.session);
  console.log(user);

  if(!user) 
    throw new AuthError("Authentication required");

  if(!user.isDev)
    throw new AuthError("User is not a developer");

  req.payload = {user};
  next();
}

const optional = (req, res, next)=> {
  const user = req.session.user || null;
  req.payload = {user};
  next();
}

module.exports = { required, requiredDev, optional }; 