const { body } = require('express-validator');

const validateImageUpload = (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'File upload error' });
    } else if (err) {
      return res.status(500).json({ error: 'Server Error' });
    }
    next();
  });
};

const changeStatusValidator = [
    body('status').notEmpty().withMessage('Status is required').isIn(['active', 'inactive']).withMessage('Invalid status'),
  ];

  const updateProfileValidator = [
    validateImageUpload,
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


  module.exports = {
    changeStatusValidator,
    updateProfileValidator,
    updateEmailValidator,
    changePasswordValidator
  };
  