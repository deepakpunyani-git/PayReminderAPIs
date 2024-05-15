const { body } = require('express-validator');


const changeStatusValidator = [
    body('status').notEmpty().withMessage('Status is required').isIn(['active', 'inactive']).withMessage('Invalid status'),
  ];
  

  module.exports = {
    changeStatusValidator,
  };
  