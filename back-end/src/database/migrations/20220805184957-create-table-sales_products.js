'use strict';

module.exports = {
   /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} Sequelize 
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'sales',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   */
  async down (queryInterface) {
    await queryInterface.dropTable('sales_products')
  }
};
