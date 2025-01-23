const express = require('express');
const { userRegistrationController } = require('../controllers/UserControllers/userController');

const router = express.Router();

router.post('/auth/register', userRegistrationController);

module.exports = router;
