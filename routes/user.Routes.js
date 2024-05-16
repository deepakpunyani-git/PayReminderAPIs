const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { changeStatusValidator,updateProfileValidator,updateEmailValidator,changePasswordValidator} = require('../validators/userValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

router.patch('/user/status/:id', verifyToken, checkUserType(['admin']), changeStatusValidator, usersController.changeUserStatus );
router.put('/user/profile-update', verifyToken, checkUserType(['admin','client']), updateProfileValidator, usersController.updateProfile);
router.put('/user/email-change', verifyToken, checkUserType(['admin','client']), updateEmailValidator, usersController.updateEmail);
router.put('/user/password-change', verifyToken, checkUserType(['admin','client']), changePasswordValidator, usersController.updatePassword);
router.get('/user/profile', verifyToken, checkUserType(['admin','client']), usersController.getProfileDetails);
module.exports = router;