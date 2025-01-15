const { OAuth2Client } = require('google-auth-library');
const { User } = require('../../models'); // Adjust the path as needed
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (token) => {
  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email; // Use email to check if the user exists
    // const firstName = payload.given_name;
    // const lastName = payload.family_name;
    // const profilePicture = payload.picture;

    // Check if the user exists in the database using email
    let user = await User.findOne({ where: { email } });

    // If the user does not exist, create a new user
    if (!user) {
        const error = new Error('Account does not exist. Please create an account first.');
        error.statusCode = 404;
        throw error;
      }

    // Generate JWT token
    const authToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      token: authToken,
    };
  } catch (error) {
    console.error('Error in googleLogin:', error);
    throw error;
  }
};

module.exports = { googleLogin };