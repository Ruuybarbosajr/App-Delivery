const { User } = require('../database/models/User');

const userCreate = async (name, email, password, role) => {
    const newUser = await User.create({ name, email, password, role });
    return newUser;
};
module.exports = userCreate;