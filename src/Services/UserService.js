const { User } = require('../../models');
const { validateUserRegistration, encryptPassword, generateJwtToken } = require('../validations/userValidation');

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

module.exports = { createUser };
