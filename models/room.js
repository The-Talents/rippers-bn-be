'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Room extends Model {

    static associate(models) {
      Room.belongsTo(models.Accommodation, {
        foreignKey: "accommodationId",
        as: "accommodation",
      });
    }
  }

  Room.init(
    {
      type: DataTypes.STRING,
      cost: DataTypes.DECIMAL,
      roomCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );

  return Room;
};
