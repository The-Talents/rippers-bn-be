const { googleLogin } = require('../Services/authService');

const googleLoginController = async (req, res) => {
  const { token } = req.query; // Using the token from query params

  if (!token) {
    return res.status(400).json({
      status: 400,
      message: 'Authorization code is required',
    });
  }

  try {
    const userData = await googleLogin(token); // Pass the token to the service

    res.status(200).json({
      status: 200,
      message: 'Login successful',
      data: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: error.message || 'Something went wrong',
    });
  }
};

module.exports = { googleLoginController };
