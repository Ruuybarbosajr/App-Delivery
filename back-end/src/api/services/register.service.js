const md5 = require('md5');
const { User } = require('../../database/models');
const generateError = require('../../utils/generateError');
const generateToken = require('../../utils/generateToken');
const schemaRole = require('../../schemas/roleValidation');
const { Op } = require("sequelize");

module.exports = {
  async create(name, email, password, role) {
    const findUser = await User.findOne({ where: {[Op.or]: [{ email }, { name }]} });
    if (findUser) throw generateError(409, 'user already exist');

    const encryptedPassword = md5(password);
    const roleVerified = schemaRole(role);
    await User.create({ name, email, password: encryptedPassword, role: roleVerified });

    const payload = {
      name,
      email,
      role: roleVerified,
    };

    const token = generateToken(payload);

    return {
      ...payload,
      token,
    };
  },
};
