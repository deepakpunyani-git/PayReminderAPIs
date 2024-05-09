const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { createStaffValidator, updateStaffValidator , listStaffValidator , updateStatusValidator, changePasswordValidator} = require('../validators/staffValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

// List all staff members
router.get('/staff', verifyToken, checkUserType('admin'), listStaffValidator, staffController.listStaff);

// Create a new staff member
router.post('/staff', verifyToken, checkUserType('admin'), createStaffValidator, staffController.createStaff);

// Update an existing staff member by _id
router.put('/staff/:id', verifyToken, checkUserType('admin'), updateStaffValidator, staffController.updateStaff);

// Update the status of an existing staff member by _id
router.patch('/staff/:id/status', verifyToken, checkUserType('admin'), updateStatusValidator, staffController.updateStaffStatus);

// Change the password of an existing staff member by _id
router.patch('/staff/:id/password', verifyToken, changePasswordValidator, staffController.changeStaffPassword);

// Delete an existing staff member by _id
router.delete('/staff/:id', verifyToken, checkUserType('admin'), staffController.deleteStaff);

module.exports = router;