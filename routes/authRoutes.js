const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword , updateProfile , updateEmail , updatePassword , getProfile ,verifyOtp  } = require('../controllers/authController');
const { validateRegister, validateLogin , validateForgotPassword , validateResetPassword , updateProfileValidator ,updatePasswordValidator ,updateEmailValidator , verifyOtpValidator  } = require('../validators/authValidator');
const {verifyToken,checkUserType} = require('../middleware/authMiddleware'); 


router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password', validateResetPassword, resetPassword);
router.put('/profile-update', verifyToken , updateProfileValidator, updateProfile);
router.put('/password-change',verifyToken ,checkUserType(['admin', 'client']), updatePasswordValidator, updatePassword);
router.put('/email-change', verifyToken , checkUserType(['admin', 'client']), updateEmailValidator, updateEmail);
router.get('/profile',verifyToken  , getProfile); 
router.post('/verify-otp', verifyOtpValidator, verifyOtp);

module.exports = router;
