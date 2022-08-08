const md5 = require('md5');
const { User } = require('../../database/models');
const generateError = require('../../utils/generateError');
const generateToken = require('../../utils/generateToken');

module.exports = {
  async loginService(dataLogin) {
    const findUser = await User.findOne({ where: { email: dataLogin.email } });
    
    if (!findUser) throw generateError(404, 'Not found');
    if (md5(dataLogin.password) !== findUser.password) throw generateError(400, 'Invalid field');

    const payload = {
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    };

    const token = generateToken(payload);

    return {
      ...payload,
      token,
    };
  },
};