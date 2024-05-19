const { body } = require('express-validator');

const addPayReminderPlanValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('features').isArray({ min: 1 }).withMessage('At least one feature is required'),
  body('yearlyPrice').notEmpty().withMessage('Yearly price is required').isNumeric().withMessage('Yearly price must be a number'),
  body('monthlyPrice').notEmpty().withMessage('Monthly price is required').isNumeric().withMessage('Monthly price must be a number'),
  body('customize_content').isBoolean().withMessage('Invalid customize content'),
  body('total_customers').notEmpty().withMessage('Total Customers is required').isNumeric().withMessage('Total Customers must be a number'),
  body('total_sms').notEmpty().withMessage('Total SMS is required').isNumeric().withMessage('Total SMS must be a number'),
  body('total_email').notEmpty().withMessage('Total Email is required').isNumeric().withMessage('Total Email must be a number'),

];

const updatePayReminderPlanValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('features').isArray({ min: 1 }).withMessage('At least one feature is required'),
  body('yearlyPrice').notEmpty().withMessage('Yearly price is required').isNumeric().withMessage('Yearly price must be a number'),
  body('monthlyPrice').notEmpty().withMessage('Monthly price is required').isNumeric().withMessage('Monthly price must be a number'),
  body('customize_content').isBoolean().withMessage('Invalid customize content'),
  body('total_customers').notEmpty().withMessage('Total Customers is required').isNumeric().withMessage('Total Customers must be a number'),
  body('total_sms').notEmpty().withMessage('Total SMS is required').isNumeric().withMessage('Total SMS must be a number'),
  body('total_email').notEmpty().withMessage('Total Email is required').isNumeric().withMessage('Total Email must be a number'),
];


module.exports = {
    addPayReminderPlanValidator,
    updatePayReminderPlanValidator,
  };