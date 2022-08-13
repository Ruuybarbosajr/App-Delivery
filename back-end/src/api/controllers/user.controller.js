const service = require('../services');

module.exports = {
  async findAllSellers(_req, res, next) {
    try {
      const allSellers = await service.user.findAllSellers();
      return res.status(200).json(allSellers);
    } catch (error) {
      next(error);
    }
  },
};