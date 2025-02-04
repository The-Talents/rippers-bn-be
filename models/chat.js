'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Chat extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Chat.init(
    {
      message: DataTypes.TEXT,
      receiver: DataTypes.INTEGER,
      sender: DataTypes.INTEGER,
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Chat',
    }
  );

  return Chat;
};
