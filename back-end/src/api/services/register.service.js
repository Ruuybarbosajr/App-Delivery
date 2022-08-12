const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');
const generateError = require('../../utils/generateError');
const generateToken = require('../../utils/generateToken');
const schemaRole = require('../../schemas/roleValidation');

module.exports = {
  async create(name, email, password, role) {
    const findUser = await User.findOne({ where: { [Op.or]: [{ email }, { name }] } });
    if (findUser) throw generateError(409, 'user already exist');

    const encryptedPassword = md5(password);
    const roleVerified = schemaRole(role);

    const { id } = await User.create(
      { name, email, password: encryptedPassword, role: roleVerified },
    );
    
    const payload = {
      id,
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
