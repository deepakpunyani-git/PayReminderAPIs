const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { changeStatusValidator,updateProfileValidator,updateEmailValidator,changePasswordValidator,updateProfilePicValidator} = require('../validators/userValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

router.patch('/user/block-status/:id', verifyToken, checkUserType(['admin']), changeStatusValidator, usersController.changeUserStatus );
router.put('/user/profile-update', verifyToken, checkUserType(['admin','client']), updateProfileValidator, usersController.updateProfile);
router.put('/user/email-change', verifyToken, checkUserType(['admin','client']), updateEmailValidator, usersController.updateEmail);
router.put('/user/password-change', verifyToken, checkUserType(['admin','client']), changePasswordValidator, usersController.updatePassword);
router.get('/user/profile', verifyToken, checkUserType(['admin','client']), usersController.getProfileDetails);
router.put('/user/update-profile-pic', verifyToken, updateProfilePicValidator, usersController.updateProfilePic);

module.exports = router;