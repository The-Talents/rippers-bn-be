'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trip.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    passport: DataTypes.STRING,
    gender: DataTypes.STRING,
    manager: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    dateForGoing: DataTypes.DATE,
    dateForReturn: DataTypes.DATE,
    reason: DataTypes.TEXT,
    accommodationId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Trip',
  });

  Trip.associate = (models) => {
    // Relationship with User
    Trip.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Relationship with Accommodation
    Trip.belongsTo(models.Accommodation, {
      foreignKey: "accommodationId",
      as: "accommodation",
    });
  };
  
  return Trip;
};