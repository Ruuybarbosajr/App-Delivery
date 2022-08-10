const jwt = require('jsonwebtoken');

const configJwt = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = (payload) => {
  const token = jwt.sign(payload, 'secret_key', configJwt);
  return token;
};