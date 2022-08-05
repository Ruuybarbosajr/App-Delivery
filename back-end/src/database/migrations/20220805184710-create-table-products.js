'use strict';

module.exports = {
   /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} Sequelize 
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.DECIMAL(4,2),
        allowNull: false,
      },
      url_image: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: ''
      }
    })
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   */
  async down (queryInterface) {
    await queryInterface.dropTable('products')
  }
};
