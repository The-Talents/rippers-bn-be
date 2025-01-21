const express = require('express');
const { userRegistrationController } = require('../controllers/UserController/userController');
const { userLoginController } = require('../controllers/UserController/LoginController');

const router = express.Router();

router.post('/auth/register', userRegistrationController);
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Users
 *     description: Login a user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mysecurepassword
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsIn...
 *       '401':
 *         description: Authentication failed - Invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post('/auth/login', userLoginController);

module.exports = router;
