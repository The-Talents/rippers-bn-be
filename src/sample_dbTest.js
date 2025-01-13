const express = require('express');
const db = require('../models/index.js'); // Adjust to your Sequelize models path

const app = express();
const PORT = process.env.PORT || 3000;

// Route to test database connection
app.get('/test-db', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.status(200).json({ message: 'Database connection successful!' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection failed!', error: error.message });
  }
});

module.exports = { app, db };