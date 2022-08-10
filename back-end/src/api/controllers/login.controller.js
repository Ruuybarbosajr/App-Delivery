const service = require('../services');

module.exports = {
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await service.login.signIn({ email, password });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  },
};