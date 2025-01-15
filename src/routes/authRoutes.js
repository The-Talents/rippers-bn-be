const express = require('express');
const { googleLoginController } = require('../controllers/authController');
const router = express.Router();

router.get('/auth/google-login', googleLoginController);

module.exports = router;