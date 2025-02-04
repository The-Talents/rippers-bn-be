import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: 'json' };
import userRoutes from './routes/userRoutes.js'; // Ensure the correct extension for ES modules

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Using Express' built-in JSON parser

// Set up user routes
app.use('/api/v1', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
