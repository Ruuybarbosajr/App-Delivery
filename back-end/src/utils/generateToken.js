const jwt = require('jsonwebtoken');
const path = require('path')

const jwtKey = require('fs')
  .readFileSync(path.join(__dirname, '../../jwt.evaluation.key'), { encoding: "utf-8" });

module.exports = (payload) => {
  const token = jwt.sign(payload, jwtKey);
  return token;
};