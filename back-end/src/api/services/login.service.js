const md5 = require('md5');
const { User } = require('../../database/models');
const generateError = require('../../utils/generateError');
const generateToken = require('../../utils/generateToken');

module.exports = {
  async signIn(loginData) {
    const findUser = await User.findOne({ where: { email: loginData.email } });
    if (!findUser) throw generateError(404, 'Cachaceiro(a) não encontrado');
   
    const { id, name, email, password, role } = findUser;
    const encryptedPassword = md5(loginData.password);

    if (encryptedPassword !== password) throw generateError(400, 'Parece que bebeu muito, pois esqueceu sua senha');

    const payload = {
      id,
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