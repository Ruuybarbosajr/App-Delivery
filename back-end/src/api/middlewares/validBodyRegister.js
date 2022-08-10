const joi = require('joi');
const generateError = require('../../utils/generateError');

const schemaRegister = joi.object({
  name: joi.string().min(12).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
});

module.exports = (req, _res, next) => {
  const { name, email, password } = req.body;
  const { error } = schemaRegister.validate({ name, email, password });
  if(error) return next(generateError(400, error.message));
  next();
}
