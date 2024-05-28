const User = require('../models/userModel');
const { validationResult } = require('express-validator');

exports.setupCompany = async (req, res, next) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { companyName, companyEmail, companyPhoneNumber } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      companyName,
      companyEmail,
      companyPhoneNumber,
      setup_completed: true
    });

    res.status(200).json({ success: true, message: 'Company setup completed successfully' });
  } catch (error) {
    next(error);
  }
};


exports.updateEmailContent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emailContent , emailSubject  } = req.body;

  await User.findByIdAndUpdate(req.user._id, {
    emailContent,
    emailSubject
  });

  res.status(200).json({ message: 'Email content updated successfully', emailContent });
};

exports.getSetupDetails = async (req, res) => {
  try {
    const details = await User.findById(req.user._id).select('companyName companyEmail companyPhoneNumber emailContent emailSubject');
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};