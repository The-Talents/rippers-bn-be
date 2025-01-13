const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, db } = require('../src/sample_dbTest.js'); 

const expect = chai.expect;
chai.use(chaiHttp);

describe('Database Connection Test', () => {
  before(async () => {
    if (!db?.sequelize) {
      throw new Error('Database connection not initialized');
    }
    await db.sequelize.sync();  // Synchronize database models
  });

  after(async () => {
    if (db?.sequelize) {
      await db.sequelize.close();  // Close the database connection
    }
  });

  it('should connect to the database and close connection successfully', async () => {
    try {
      await db.sequelize.authenticate();  // Test database connection
      expect(true).to.be.true;  // If no error, the connection is successful
    } catch (error) {
      console.error('Database connection failed:', error);
      throw new Error('Database connection failed!');
    }
  });
});
