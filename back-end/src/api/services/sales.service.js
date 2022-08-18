const Sequelize = require('sequelize');
const { Sale, User, SaleProduct, Product } = require('../../database/models');
const generateError = require('../../utils/generateError');
const config = require('../../database/config/config');
const insertIdSale = require('../../utils/insertIdSale');
const permissionToCheck = require('../../schemas/permissionToCheck');

const sequelize = new Sequelize(config.development);

const getAllSales = async (queryConfig = {}) => Sale.findAll({
  ...queryConfig,
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: User, as: 'seller', attributes: { exclude: ['password', 'email', 'role'] } },
    { model: Product, as: 'products', through: { attributes: ['quantity'] } },
  ],
  attributes: { exclude: ['userId', 'sellerId'] },
});

module.exports = {
  async create(sale) {
    const { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber, products } = sale;

    const findSeller = await User.findOne({ where: { id: sellerId, role: 'seller' } });

    if (!findSeller) throw generateError(404, 'Vendedor(a) não encontrado(a)');
    
    const newSaleId = await sequelize.transaction(async (transaction) => {
      const newSale = await Sale.create(
        { sellerId, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate: new Date() },
        { transaction },
      );
      
      const productsToInsert = insertIdSale(products, newSale.dataValues.id);
      await SaleProduct.bulkCreate(productsToInsert, { transaction });
      
      return newSale.dataValues.id;
    });
    return newSaleId;
  },

  async findOne(id, user) {
    const [findSale] = await getAllSales({ where: { id } });
    if (!findSale) throw generateError(404, 'Venda não encontrada');

    const isValidUser = permissionToCheck(user, findSale.dataValues);
    if (!isValidUser) throw generateError(401, 'Não autorizado');
    
    return findSale;
  },

  async updateStatus(id, status, user) {
    const sale = await this.findOne(id, user);
    
    await Sale.update({ status }, { where: { id } });

    return {
      ...sale.dataValues,
      status,
    };
  },

  async getAll(id, role) {
    const callByRole = {
      customer: getAllSales({ where: { userId: id } }),
      seller: getAllSales({ where: { sellerId: id } }),
      administrator: getAllSales(),
    };

    return callByRole[role];
  },
};