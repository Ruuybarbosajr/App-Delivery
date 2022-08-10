const joi = require('joi')
const generateError = require('../../utils/generateError');

const schemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
})

module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = schemaLogin.validate({ email, password })
  if (error) return next(generateError(400, 'email and password is required'));
  next();
};