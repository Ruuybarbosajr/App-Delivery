const md5 = require('md5');
const { User } = require('../../database/models');
const generateError = require('../../utils/generateError');
const generateToken = require('../../utils/generateToken');

module.exports = {
  async signIn(loginData) {
    const findUser = await User.findOne({ where: { email: loginData.email } });
    if (!findUser) throw generateError(404, 'Not found');
   
    const { name, email, password, role } = findUser;
    const decryptedPassword = md5(loginData.password);

    if (decryptedPassword !== password) throw generateError(400, 'Invalid field');

    const payload = {
      name,
      email,
      role,
    };

    const token = generateToken(payload);

    return {
      ...payload,
      token,
    };
  },
};