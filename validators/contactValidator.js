const { body , query} = require('express-validator');

exports.addMessageValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('message').notEmpty().withMessage('Message is required')
];

exports.changeStatusValidator = [
  body('status').custom(value => ['pending', 'read'].includes(value)).withMessage('Invalid status')
];

exports.validateListMessages = [
  query('page').optional().isInt().toInt(),
  query('limit').optional().isInt().toInt(),
  query('status').optional().isString(),
  query('fromDate').optional().isISO8601().toDate(),
  query('toDate').optional().isISO8601().toDate(),
  query('sortBy').optional().isString(),
  query('sortOrder').optional().isIn(['asc', 'desc'])
];