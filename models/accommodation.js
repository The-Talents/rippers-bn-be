'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Accommodation extends Model {
    static associate(models) {
      // Accommodation has many Rooms
      Accommodation.hasMany(models.Room, {
        foreignKey: "accommodationId",
        as: "rooms",
      });
    }
  }

  Accommodation.init(
    {
      name: DataTypes.STRING,
      numberOfRooms: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      location: DataTypes.STRING,
      geolocation: DataTypes.STRING,
      services: DataTypes.TEXT,
      amenities: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Accommodation',
    }
  );

  return Accommodation;
};
