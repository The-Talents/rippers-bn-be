'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init({
    userId: DataTypes.INTEGER,
    facility: DataTypes.STRING,
    like: DataTypes.BOOLEAN,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Feedback',
  });

  Feedback.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  return Feedback;
};