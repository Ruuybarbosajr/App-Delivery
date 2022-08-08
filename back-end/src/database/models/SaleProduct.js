/**
* 
* @param {import('sequelize').Sequelize} sequelize 
* @param {import('sequelize').DataTypes} DataTypes 
*/

module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    salesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey: true
    },
    productsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    underscored: true
  })
  
  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      foreignKey: 'salesId',
      through: SaleProduct,
      otherKey: 'productsId'
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      foreignKey: 'productsId',
      through: SaleProduct,
      otherKey: 'salesId'
    });
  };

  return SaleProduct;
}