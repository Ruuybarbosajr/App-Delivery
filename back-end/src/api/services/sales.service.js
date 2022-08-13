const Sequelize = require('sequelize');
const { Sale, User, SaleProduct, Product } = require('../../database/models');
const generateError = require('../../utils/generateError');
const config = require('../../database/config/config');
const insertIdSale = require('../../utils/insertIdSale');

const sequelize = new Sequelize(config.development);

module.exports = {
  async create(sale) {
    const { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber, products } = sale;

    const findSeller = await User.findOne({ where: { id: sellerId, role: 'seller' } });

    if (!findSeller) throw generateError(400, 'seller not found');
    
    const newSaleId = await sequelize.transaction(async (transaction) => {
      const newSale = await Sale.create(
        { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber },
        { transaction },
      );
      
      const productsToInsert = insertIdSale(products, newSale.dataValues.id);
      await SaleProduct.bulkCreate(productsToInsert, { transaction });
      
      return newSale.dataValues.id;
    });
    return newSaleId;
  },

  async findOne(id, user) {
    const findSale = await Sale.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: User, as: 'seller', attributes: { exclude: ['password', 'email', 'role'] } },
        { model: Product, as: 'products', through: { attributes: [] } },
      ],
      attributes: { exclude: ['userId', 'sellerId'] },
    });
    if (!findSale) throw generateError(400, 'sale not found');

    const { user: { id: userId } } = findSale.dataValues;
    if (userId !== user.id) throw generateError(401, 'purchase does not belong to the user');
    
    return findSale;
  },
};
