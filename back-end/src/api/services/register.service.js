const { User } = require('../../database/models');
const md5 = require('md5');

const userCreate = async (name, email, password, role) => {
    const senhaCriptografada = md5(password);
    const newUser = await User.create({ name, email, password: senhaCriptografada, role });
    return newUser;
};

const verifyUserByName = async (name) => {
    const verifyUser = await User.findOne({ where: { name }});
    return verifyUser;
}
module.exports = {
    userCreate,
    verifyUserByName,
};