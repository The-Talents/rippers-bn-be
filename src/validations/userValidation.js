// userValidation.js
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../models/index.js';

const { User } = db;

const userValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).alphanum().required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.alphanum': 'Password must be alphanumeric',
    'any.required': 'Password is required',
  }),
  firstName: Joi.string().required().messages({
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'Last name is required',
  }),
  birthOfDate: Joi.date().iso().required().messages({
    'date.base': 'Invalid date format',
    'any.required': 'Date of birth is required',
  }),
  preferredLanguage: Joi.string().optional().messages({
    'string.base': 'Preferred language must be a string',
  }),
  preferredCurrency: Joi.string().optional().messages({
    'string.base': 'Preferred currency must be a string',
  }),
  whereYouLive: Joi.string().optional().messages({
    'string.base': 'Location must be a string',
  }),
  role: Joi.string().required().messages({
    'any.required': 'Role is required',
  }),
  department: Joi.string().optional().messages({
    'string.base': 'Department must be a string',
  }),
  lineManager: Joi.string().optional().messages({
    'string.base': 'Line Manager must be a string',
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional().messages({
    'any.only': 'Gender must be Male, Female, or Other',
  }),
  telephoneNumber: Joi.string()
    .pattern(/^\+?\d{7,15}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Telephone number must be a valid phone number',
    }),
});

const validateEmailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new Error('Email already exists');
  }
};

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); 
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateJwtToken = (user) => {
  const payload = {
    userId: user.id, 
    email: user.email,
    role: user.role,  
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export const validateUserRegistration = async (userData) => {
  const { error } = userValidationSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }
  await validateEmailExists(userData.email); 
};
