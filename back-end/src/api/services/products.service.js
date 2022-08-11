const { Product } = require('../../database/models');

module.exports = {
  async getAll() { return Product.findAll(); },
};
