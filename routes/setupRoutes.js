const express = require('express');
const router = express.Router();
const setupController = require('../controllers/setupController');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');
const isValidPhoneNumber = (value) => /^\d{3}-\d{3}-\d{4}$/.test(value);
const { body } = require('express-validator');


const setupValidationRules = [
    body('companyName').notEmpty().withMessage('Company name is required'),
    body('companyEmail').isEmail().withMessage('Invalid email'),
    body('companyPhoneNumber')
      .notEmpty().withMessage('Company phone number is required')
      .matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('Invalid phone number format (xxx-xxx-xxxx)')
      .custom(isValidPhoneNumber).withMessage('Invalid phone number format (xxx-xxx-xxxx)'),
  ];

  const setupEmailContentValidationRules = [
    body('emailSubject').notEmpty().withMessage('Email Subject is required'),
    body('emailContent').notEmpty().withMessage('Email Content is required'),
  ];


// POST route to setup company
router.post('/setup', verifyToken,checkUserType(['client']),setupValidationRules, setupController.setupCompany);
router.post('/setup-email-content', verifyToken,checkUserType(['client']),setupEmailContentValidationRules, setupController.updateEmailContent);
router.get('/setup-details', verifyToken,checkUserType(['client']) , setupController.getSetupDetails);

module.exports = router;
