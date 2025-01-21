const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); 
const userRoutes = require('./routes/userRoutes'); 

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/api', userRoutes); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;