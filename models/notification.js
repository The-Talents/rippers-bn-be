'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Notification extends Model {
    static associate(models) {
      // Define associations if needed
    }
  }

  Notification.init(
    {
      message: DataTypes.TEXT,
      receiver: DataTypes.INTEGER,
      sender: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Notification',
    }
  );

  return Notification;
};
