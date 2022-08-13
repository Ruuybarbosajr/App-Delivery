const login = require('./login.controller');
const register = require('./register.controller');
const products = require('./products.controller');
const images = require('./images.controller');
const sales = require('./sales.controller');
const user = require('./user.controller');

module.exports = {
  login,
  register,
  products,
  images,
  sales,
  user,
};