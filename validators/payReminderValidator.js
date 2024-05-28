const { body, param } = require('express-validator');
const moment = require('moment');

const validateReminder = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('reminderStartDate')
  .isISO8601()
  .toDate()
  .withMessage('Invalid date format for reminderStartDate')
  .custom((value, { req }) => {
    const today = new Date();
    if (value <= today) {
      throw new Error('Reminder start date must be greater than today');
    }
    return true;
  }),
   
  body('numberOfPayments').isInt({ min: 1 }).withMessage('Number of Payments must be a positive integer'),
  body('notifyBeforeDays').isInt({ min: 1 }).withMessage('Notify Before Days must be a positive integer'),
  body('paymentAmountPerInstallment').isFloat({ min: 1 }).withMessage('Payment Amount Per Installment must be a positive number'),
  body('recurringNotificationDays').isInt({ min: 1 }).withMessage('Recurring Notification Days must be a positive integer')
  
];


const validateUpdateReminder = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
];

const validateEmailContent = [
  body('emailSubject')
    .isString()
    .withMessage('Email Subject must be a string')
    .notEmpty()
    .withMessage('Email Subject is required'),
  body('emailContent')
    .isString()
    .withMessage('Email Content must be a string')
    .notEmpty()
    .withMessage('Email Content is required'),
  body('useCustomContent')
    .isBoolean()
    .withMessage('Use Custom Content must be a boolean')
    .optional()
];
const validateReminderDetails = [
  body('notificationDate')
    .isISO8601()
    .withMessage('Notification Date must be a valid date'),
  body('paymentDate')
    .isISO8601()
    .withMessage('Payment Date must be a valid date'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
];

const markPaymentReceivedValidator = [
  body('paymentReceived')
    .isBoolean()
    .withMessage('Payment received must be a boolean value'),
];

module.exports = { validateReminder , validateUpdateReminder , validateEmailContent , validateReminderDetails,markPaymentReceivedValidator};
