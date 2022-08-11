const decodeToken = require('../../utils/decodeToken');

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;
  const decoded = decodeToken(authorization);
  if (decoded.message) return next({ ...decoded });
  req.user = { ...decoded };
  next();
};