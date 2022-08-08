const generateError = require('../../utils/generateError');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(generateError(400, 'email and password is required'));
  next();
};