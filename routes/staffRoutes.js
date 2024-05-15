const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { createStaffValidator , listStaffValidator , changePasswordValidator , addStaffValidator} = require('../validators/staffValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

// List all staff members
router.get('/staff', verifyToken, checkUserType(['admin']), listStaffValidator, staffController.getStaffList);

// Create a new staff member
router.post('/staff', verifyToken, checkUserType(['admin']), addStaffValidator,staffController.addStaff);

router.patch('/staff/password/:id', verifyToken, checkUserType(['admin']), changePasswordValidator, staffController.changePassword);

// Delete an existing staff member by _id
router.delete('/staff/:id', verifyToken, checkUserType(['admin']), staffController.deleteStaff);

module.exports = router;