const { createUser } = require('../../Services/UserService');

const userRegistrationController = async (req, res) => {
  try {
    const userData = req.body;
    
    const { user, token } = await createUser(userData);
    return res.status(201).json({
      message: 'User successfully registered',
      user,
      token
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || 'An error occurred during registration'
    });
  }
};

module.exports = { userRegistrationController };
