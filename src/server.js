import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: 'json' };
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
