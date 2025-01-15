'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'googleId', {
      type: Sequelize.STRING,
      allowNull: true, // Set to false if the field is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'googleId');
  },
};