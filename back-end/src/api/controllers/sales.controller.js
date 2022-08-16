const service = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
      const { id: userId } = req.user;
      const newSaleId = await service.sales.create(
        { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber, products },
      );
      return res.status(201).json(newSaleId);
    } catch (error) {
      next(error);
    }
  },

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const sale = await service.sales.findOne(id, { ...req.user });
      return res.status(200).json(sale);
    } catch (error) {
     next(error);
    }
  },

  async updateStatus(req, res, next) {
     try {
      const { body: { status }, params: { id }, user } = req;
      console.log(status);
      console.log(user);
      console.log(id);
      const updatedSale = await service.sales.updateStatus(id, status, user);
      return res.status(200).json(updatedSale);
     } catch (error) {
      next(error);
     }
  },

  async getAll(req, res, next) {
    try {
      const { id, role } = req.user;
      const allSales = await service.sales.getAll(id, role);
      return res.status(200).json(allSales);
    } catch (error) {
      next(error);
    }
  },
};