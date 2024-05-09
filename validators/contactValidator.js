const { body } = require('express-validator');

exports.addMessageValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('message').notEmpty().withMessage('Message is required')
];

exports.changeStatusValidator = [
  body('messageId').notEmpty().withMessage('Message ID is required').isMongoId().withMessage('Invalid message ID'),
  body('status').custom(value => ['pending', 'read'].includes(value)).withMessage('Invalid status')
];