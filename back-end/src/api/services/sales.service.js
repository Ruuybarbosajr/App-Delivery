const Sequelize = require('sequelize');
const { Sale, User, SaleProduct } = require('../../database/models');
const generateError = require('../../utils/generateError');
const config = require('../../database/config/config');
const getIds = require('../../utils/getIds')

const sequelize = new Sequelize(config.development);

module.exports = {
  async create(sale) {
    const { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber, products } = sale;

    const findSeller =  await User.findOne({ where: { id: sellerId } });
    if (!findSeller) throw generateError(400, 'seller not found');
    
    const insert = await sequelize.transaction(async (transaction) => {
      
      const newSale = await Sale.create(
        { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber },
        { transaction }
      );
      
      const productsId = getIds(products, newSale.dataValues.id);
      await SaleProduct.bulkCreate(productsId, { transaction });
      
      return newSale.getProducts();
    });

    console.log('AAAAAAAAAAAAAAAA', insert);
  },
};
