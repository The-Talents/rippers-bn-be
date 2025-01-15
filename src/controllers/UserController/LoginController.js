const { loginUser } = require('../../Services/UserService');

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    if (!user || !token) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    return res.status(201).json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || 'Login failed',
    });
  }
};

module.exports = { userLoginController };
