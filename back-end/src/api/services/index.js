const login = require('./login.service');
const register = require('./register.service');
const products = require('./products.service');
const sales = require('./sales.service');
const user = require('./user.service');

module.exports = {
  login,
  register,
  products,
  sales,
  user,
};