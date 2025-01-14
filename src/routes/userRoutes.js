const express = require('express');
const { userRegistrationController } = require('../controllers/UserController/userController');
const { userLoginController } = require('../controllers/UserController/LoginController');

const router = express.Router();

router.post('/register', userRegistrationController);
router.post('/login', userLoginController);

module.exports = router;
