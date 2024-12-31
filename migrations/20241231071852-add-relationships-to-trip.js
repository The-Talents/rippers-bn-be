'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('Trips');
    
    if (!columns.userId) {
      await queryInterface.addColumn('Trips', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    if (!columns.accommodationId) {
      await queryInterface.addColumn('Trips', 'accommodationId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accommodations',  // 'Accommodations' table
          key: 'id',                // Referencing the 'id' column
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

async down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("Trips", "userId");
  await queryInterface.removeColumn("Trips", "accommodationId");
},

};
