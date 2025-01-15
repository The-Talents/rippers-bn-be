'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init({
    type: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    roomCode:
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, 
  
  {
    sequelize,
    modelName: 'Room',
  });

  Room.associate = (models) => {
    // Room belongs to an Accommodation
    Room.belongsTo(models.Accommodation, {
      foreignKey: "accommodationId",
      as: "accommodation",
    });
  };
  
  return Room;
};