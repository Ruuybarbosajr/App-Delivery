const { Product } = require('../../database/models');
const serializePrice = require('../../utils/serializePrice');

module.exports = {
  async getAll() { 
    const allProducts = await Product.findAll();
    return serializePrice(allProducts);
  },
};
