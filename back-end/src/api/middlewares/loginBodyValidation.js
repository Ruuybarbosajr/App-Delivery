const schemaLogin = require('../../schemas/loginBody');
const generateError = require('../../utils/generateError');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = schemaLogin.validate({ email, password });
  if (error) return next(generateError(400, 'Quem é você?'));
  next();
};