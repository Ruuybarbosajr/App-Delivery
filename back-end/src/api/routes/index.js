const login = require('./login.routes');
const register = require('./register.routes');
const products = require('./products.routes');
const images = require('./images.routes');
const sales = require('./sales.routes');

module.exports = {
  login,
  register,
  products,
  images,
  sales,
};
