import { config } from 'dotenv';
import express from 'express';
import routes from './routes';

config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
