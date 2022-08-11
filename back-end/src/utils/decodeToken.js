const jwt = require('jsonwebtoken');

module.exports = (token) => {
  try {
    const payload = jwt.verify(token, 'secret_key');
    return payload;
  } catch ({ message }) {
    return {
      message,
      status: 401,
    };
  }
};
