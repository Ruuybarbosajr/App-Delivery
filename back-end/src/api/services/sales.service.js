const Sequelize = require('sequelize');
const { Sale, User, SaleProduct } = require('../../database/models');
const generateError = require('../../utils/generateError');
const config = require('../../database/config/config');
const insertIdSale = require('../../utils/insertIdSale')

const sequelize = new Sequelize(config.development);

module.exports = {
  async create(sale) {
    const { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber, products } = sale;

    const findSeller =  await User.findOne({ where: { id: sellerId } });
    if (!findSeller) throw generateError(400, 'seller not found');
    
    const newSaleId = await sequelize.transaction(async (transaction) => {

      const newSale = await Sale.create(
        { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber },
        { transaction }
      );
      
      const productsToInsert = insertIdSale(products, newSale.dataValues.id);
      await SaleProduct.bulkCreate(productsToInsert, { transaction });
      
      return newSale.dataValues.id;
    });
    return newSaleId;
  },
};
