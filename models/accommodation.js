'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Accommodation.init({
    name: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    geolocation: DataTypes.STRING,
    services: DataTypes.TEXT,
    amenities: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Accommodation',
  });

  Accommodation.associate = (models) => {
    // Accommodation has many Rooms
    Accommodation.hasMany(models.Room, {
      foreignKey: "accommodationId",
      as: "rooms",
    });
  };
  
  return Accommodation;
};