'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
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
    email: DataTypes.STRING,
    googleId: DataTypes.STRING, // Add this line
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

  return User;
};