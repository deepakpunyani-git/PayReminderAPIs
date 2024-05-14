const { body } = require('express-validator');


exports.validateRegister = [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
];

exports. validateLogin = [
  body('usernameOrEmail').exists().trim(),
  body('password', 'Password is required').notEmpty()
];

exports.validateForgotPassword = [
  body('email', 'Please include a valid email').isEmail()
];

exports.validateResetPassword = [
  body('email', 'Please include a valid email').isEmail(),
  body('otp', 'OTP is required').notEmpty(),
  body('newPassword', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
];

exports.updateProfileValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt().withMessage('Age must be a valid integer'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be one of: male, female, other')
];

exports.updatePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.updateEmailValidator = [
  body('newEmail').isEmail().withMessage('Please provide a valid email')
];

exports.updateProfileValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a valid integer'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be one of: male, female, other')
];

exports.verifyOtpValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('otp').notEmpty().withMessage('OTP is required'),
];