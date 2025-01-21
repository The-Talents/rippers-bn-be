const { googleLogin } = require('../Services/authService');

const googleLoginController = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      status: 400,
      message: 'Authorization code is required',
    });
  }

  try {
    const userData = await googleLogin(token);

    return res.status(200).json({
      status: 200,
      message: 'Login successful',
      data: userData,
    });
  } catch (error) {
    // Add debug logging
    console.error('Controller error:', error);
    console.error('Status code:', error.statusCode);
    
    // Use the error's status code or default to 400
    const statusCode = error.statusCode || 400;
    
    return res.status(statusCode).json({
      status: statusCode,
      message: error.message || 'Something went wrong',
    });
  }
};

module.exports = { googleLoginController };