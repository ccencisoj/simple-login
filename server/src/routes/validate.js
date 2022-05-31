const yup = require("yup");
const EmptyError = require("../errors/EmptyError");
const ValidationError = require("../errors/ValidationError");

const validate = {};

validate.body = (schema)=> {
  const validator = yup.object(schema);

  return async (req, res, next)=> {
    let body = {};

    try {
      body = JSON.parse(JSON.stringify(req.body));

    }catch(error) {
      //ignore error
    }

    try {
      const results = await validator.validate(body);

      Object.keys(results).forEach((key)=> {
        if(!(key in schema)) delete results[key]; 
      });
      
      req.body = results;

    }catch(error) {
      throw new ValidationError(error.message);
    }

    next();
  }
}

validate.query = (schema)=> {
  const validator = joi.object(schema);

  return async (req, res, next)=> {
    try {
      const results = await validator.validate(req.query);

      Object.keys(results).forEach((key)=> {
        if(!(key in schema)) delete results[key]; 
      });

      req.body = results;

    }catch(error) {
      throw new ValidationError(error.message);
    }

    next();
  }
}

validate.params = (schema)=> {
  const validator = yup.object(schema);

  return async (req, res, next)=> {
    try {
      const results = await validator.validate(req.params);

      Object.keys(results).forEach((key)=> {
        if(!(key in schema)) delete results[key]; 
      });

      req.body = results;

    }catch(error) {
      throw new ValidationError(error.message);
    }

    next();
  }
}

validate.file = (rules)=> {
  return async (req, res, next)=> {
    const file = req.file;

    if(!file && !rules.empty)
      throw new EmptyError("req.file is undefined");

    next();
  }
}

module.exports = validate;