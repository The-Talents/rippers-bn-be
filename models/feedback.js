'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Feedback.init(
    {
      userId: DataTypes.INTEGER,
      facility: DataTypes.STRING,
      like: DataTypes.BOOLEAN,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Feedback',
    }
  );

  return Feedback;
};
