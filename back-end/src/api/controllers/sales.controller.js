const service = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
      const { id: userId } = req.user;
      const newSaleId = await service.sales.create(
        { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber, products }
      );
      return res.status(201).json(newSaleId);
    } catch (error) {
      next(error);
    }
  }
}