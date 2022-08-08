/**
* 
* @param {import('sequelize').Sequelize} sequelize 
* @param {import('sequelize').DataTypes} DataTypes 
*/
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  },
  {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Sales, {
      as: 'purchases',
      foreignKey: 'id'
    });

    User.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'id'
    });
  };

  return User;
}