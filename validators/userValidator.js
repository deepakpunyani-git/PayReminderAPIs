const { body } = require('express-validator');


const changeStatusValidator = [
  body('block_user')
  .notEmpty().withMessage('Status is required')
  .isBoolean().withMessage('Invalid status')

];

  const updateProfileValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').notEmpty().withMessage('Age is required'),
    body('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female', 'other']).withMessage('Invalid gender')
];

const updateEmailValidator = [
  body('new_email').notEmpty().withMessage('New email is required').isEmail().withMessage('Invalid email format')
];
  
const changePasswordValidator = [
  body('old_password').notEmpty().withMessage('Old password is required'),
  body('new_password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')

];

const updateProfilePicValidator = [
  body('profile_pic').notEmpty().withMessage('Profile picture is required')
];


  module.exports = {
    changeStatusValidator,
    updateProfileValidator,
    updateEmailValidator,
    changePasswordValidator,
    updateProfilePicValidator
  };
  