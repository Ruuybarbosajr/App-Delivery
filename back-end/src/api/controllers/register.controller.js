const service = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const userData = await service.register.create(name, email, password, role);
      return res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  },
};
