const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser for JSON parsing
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // Assuming your swagger.json is located at this path
const userRoutes = require('./routes/userRoutes'); // Import user routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Set up user routes
app.use('/api/v1', userRoutes); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
