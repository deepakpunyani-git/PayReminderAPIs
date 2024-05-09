// validators/clientValidator.js
const { query, body } = require('express-validator');

const listClientsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Invalid page number'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit number'),
  query('name').optional(),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Invalid sortOrder'),
];

const changeClientStatusValidator = [
  body('status').notEmpty().withMessage('Status is required').isIn(['active', 'inactive']).withMessage('Invalid status'),
];

module.exports = {
  listClientsValidator,
  changeClientStatusValidator,
};
