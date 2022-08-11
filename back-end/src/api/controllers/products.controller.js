const service = require('../services');

module.exports = {
  async getAll(_req, res, next) {
    try {
      const allProdutcs = await service.products.getAll();
      return res.status(200).json(allProdutcs);
    } catch (error) {
      next(error);
    }
  },
};