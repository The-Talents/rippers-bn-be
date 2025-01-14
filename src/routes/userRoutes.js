const express = require('express');
const { userRegistrationController } = require('../controllers/userController');

const router = express.Router();

router.post('/register', userRegistrationController);

module.exports = router;
