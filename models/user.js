'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      User.hasMany(models.Trip, {
        foreignKey: "userId",
        as: "trips",
      });

      User.hasMany(models.Feedback, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    birthOfDate: DataTypes.DATEONLY,
    preferredLanguage: DataTypes.STRING,
    preferredCurrency: DataTypes.STRING,
    whereYouLive: DataTypes.STRING,
    role: DataTypes.STRING,
    department: DataTypes.STRING,
    lineManager: DataTypes.STRING,
    gender: DataTypes.STRING,
    telephoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  // User.associate = (models) => {
  //   // Existing associations
  //   User.hasMany(models.Trip, {
  //     foreignKey: "userId",
  //     as: "trips",
  //   });
  // };

  // User.hasMany(models.Feedback, {
  //   foreignKey: 'userId',
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // });

  return User;
};