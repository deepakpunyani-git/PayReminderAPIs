// routes/payReminderPlanRoutes.js
const express = require('express');
const router = express.Router();
const payReminderPlanController = require('../controllers/plansController');
const { addPayReminderPlanValidator, updatePayReminderPlanValidator } = require('../validators/planValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

// Add PayReminderPlan
router.post('/payReminderPlan', verifyToken, checkUserType('admin'), addPayReminderPlanValidator, payReminderPlanController.addPayReminderPlan);

// Update PayReminderPlan by ID
router.put('/payReminderPlan/:id', verifyToken, checkUserType('admin'), updatePayReminderPlanValidator, payReminderPlanController.updatePayReminderPlan);

// Delete PayReminderPlan by ID
router.delete('/payReminderPlan/:id', verifyToken, checkUserType('admin'), payReminderPlanController.deletePayReminderPlan);

// List all PayReminderPlans
router.get('/payReminderPlans', verifyToken, payReminderPlanController.listPayReminderPlans);

module.exports = router;
