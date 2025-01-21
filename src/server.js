const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser for JSON parsing
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); 
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());



// Set up user routes
app.use('/api/v1', authRoutes);


// Swagger API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
