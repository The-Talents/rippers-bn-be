const { User } = require('../../models');
const { validateUserRegistration, encryptPassword, generateJwtToken } = require('../validations/userValidation');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
  await validateUserRegistration(userData);
  const hashedPassword = await encryptPassword(userData.password);

  const newUser = await User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    birthOfDate: userData.birthOfDate,
    preferredLanguage: userData.preferredLanguage,
    preferredCurrency: userData.preferredCurrency,
    whereYouLive: userData.whereYouLive,
    role: userData.role,
    department: userData.department,
    lineManager: userData.lineManager,
    gender: userData.gender,
    telephoneNumber: userData.telephoneNumber,
    password: hashedPassword
  });

  const token = generateJwtToken(newUser);
  return { user: newUser, token };
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { message: 'User not found', success: false };
    }
    return { user, success: true };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return { message: 'An error occurred while fetching the user', success: false, error };
  }
};


const loginUser = async (email, password) => {
  const userResponse = await getUserByEmail(email);

  if (!userResponse.success) {
    return userResponse; 
  }

  const user = userResponse.user;

  if (!user) {
    return { success: false, message: 'Invalid credentials' };
  }

  console.log('User Data:', user); 

 
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { success: false, message: 'Invalid credentials' };
  }

  const token = generateJwtToken(user); 
  console.log('Generated Token:', token); 
  return { user, token };
};


module.exports = { createUser,loginUser };
