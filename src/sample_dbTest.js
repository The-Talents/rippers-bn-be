const express = require('express');
const db = require('../models/index.js'); // Adjust to your Sequelize models path

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
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


// Route to create a new user
app.post('/create-user', async (req, res) => {
  try {
    const { firstName, lastName, email, preferredLanguage, preferredCurrency, whereYouLive, role, department, lineManager, gender, telephoneNumber } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email  || !gender || !telephoneNumber) {
      return res.status(500).json({ message: 'Missing required fields!' });
    }

    // Create new user
    const user = await db.User.create({
      firstName,
      lastName,
      email,
      // birthOfDate,
      preferredLanguage,
      preferredCurrency,
      whereYouLive,
      role,
      department,
      lineManager,
      gender,
      telephoneNumber
    });

    res.status(201).json({ message: 'User created successfully!', user });
  } catch (error) {
    console.error('User creation failed:', error);
    res.status(500).json({ message: 'User creation failed!', error: error.message });
  }
});

module.exports = { app, db };