const { User } = require('../../database/models');

module.exports = {
  async findAllSellers() {
    return User.findAll(
      { 
        where: { role: 'seller' },
        attributes: { exclude: ['password', 'email'] }, 
      },
    ); 
  },
};