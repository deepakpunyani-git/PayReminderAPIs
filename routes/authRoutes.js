const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword ,verifyOtp  } = require('../controllers/authController');
const { validateRegister, validateLogin , validateForgotPassword , validateResetPassword , verifyOtpValidator  } = require('../validators/authValidator');


router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password', validateResetPassword, resetPassword);
router.post('/verify-otp', verifyOtpValidator, verifyOtp);

module.exports = router;
