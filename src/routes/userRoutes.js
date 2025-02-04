import express from 'express';
import { userRegistrationController } from '../controllers/UserControllers/userController.js';

const router = express.Router();

router.post('/auth/register', userRegistrationController);

export default router;
