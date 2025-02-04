'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
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
    birthOfDate: DataTypes.DATEONLY,
    preferredLanguage: DataTypes.STRING,
    preferredCurrency: DataTypes.STRING,
    whereYouLive: DataTypes.STRING,
    role: DataTypes.STRING,
    department: DataTypes.STRING,
    lineManager: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    telephoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
