const md5 = require('md5');
const { User } = require('../../database/models');
const generateError = require('../../utils/generateError');
const generateToken = require('../../utils/generateToken');

module.exports = {
  async create(name, email, password, role = 'customer') {

    const findUser = await User.findOne({ where: { email } });
    if (findUser) throw generateError(409, 'user already exist');
    const encryptedPassword = md5(password);
    await User.create({ name, email, password: encryptedPassword, role });

    const payload = {
      name,
      email,
      role
    }

    const token = generateToken(payload);

    return {
      ...payload,
      token
    }
  }

};
