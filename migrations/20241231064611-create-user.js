'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,  
      },
      birthOfDate: {
        type: Sequelize.DATE
      },
      preferredLanguage: {
        type: Sequelize.STRING
      },
      preferredCurrency: {
        type: Sequelize.STRING
      },
      whereYouLive: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      lineManager: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      telephoneNumber: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};