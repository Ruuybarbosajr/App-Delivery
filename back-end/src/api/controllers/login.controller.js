const { loginService } = require('../services/login.service');

module.exports = {
  async loginController(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await loginService({ email, password });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  },
};