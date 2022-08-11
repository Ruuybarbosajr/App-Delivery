const joi = require('joi');

const schemaRegister = joi.object({
  name: joi.string().min(12).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports = schemaRegister;