const { body , query} = require('express-validator');

const addStaffValidator = [
  body('name', 'Name is required').notEmpty(),
  body('username', 'Username is required').notEmpty(),
  body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
  body('usertype').notEmpty().isIn(['admin', 'staff', 'client']).withMessage('Invalid user type')
];

const changePasswordValidator = [
  body('newPassword', 'Password must be at least 8 characters long').isLength({ min: 8 }),
];


const listStaffValidator = [
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Invalid sortOrder parameter'),
];

module.exports = {
  addStaffValidator,
  changePasswordValidator,
  listStaffValidator
};
