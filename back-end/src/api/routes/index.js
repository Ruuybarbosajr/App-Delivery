const login = require('./login.routes');
const register = require('./register.routes');
const products = require('./products.routes');
const images = require('./images.routes');

module.exports = {
  login,
  register,
  products,
  images,
};
