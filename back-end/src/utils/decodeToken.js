const jwt = require('jsonwebtoken');
const path = require('path');

const jwtKey = require('fs')
  .readFileSync(path.join(__dirname, '../../jwt.evaluation.key'), { encoding: 'utf-8' });

module.exports = (token) => {
  try {
    const payload = jwt.verify(token, jwtKey);
    return payload;
  } catch ({ message }) {
    return {
      message,
      status: 401,
    };
  }
};
