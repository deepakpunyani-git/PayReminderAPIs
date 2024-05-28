const express = require('express');
const router = express.Router();
const setupController = require('../controllers/setupController');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');
const {
    createReminder,
    updateReminder,
    getSingleReminder,
    getAllReminders,
    stopReminder,
    updateCustomEmailContent,
    updateReminderDetails,
    markPaymentReceived,
    getSingleReminderDetail,
    stopSingleReminder
  
  } = require('../controllers/PayReminderController');
  const { validateReminder , validateUpdateReminder , validateEmailContent , markPaymentReceivedValidator,validateReminderDetails} = require('../validators/payReminderValidator');


router.post('/reminders', verifyToken,checkUserType(['client']),  validateReminder , createReminder);

router.put('/reminders/:id', verifyToken,checkUserType(['client']), validateUpdateReminder ,updateReminder);

router.get('/reminders/:id', verifyToken,checkUserType(['client']), getSingleReminder);

router.get('/reminders', verifyToken,checkUserType(['client']), getAllReminders);

router.put('/reminders/stop/:id', verifyToken,checkUserType(['client']),stopReminder);

router.put('/reminders/custom-email/:id/',verifyToken,checkUserType(['client']), validateEmailContent, updateCustomEmailContent);


// Update reminder details
router.put('/reminderdetails/:id',verifyToken,checkUserType(['client']), validateReminderDetails, updateReminderDetails);

// Stop reminder
router.put('/reminderdetails/stop/:id', verifyToken, checkUserType(['client']), stopSingleReminder);

// Mark payment received
router.put('/reminderdetails/payment-received/:id', verifyToken,checkUserType(['client']),markPaymentReceivedValidator, markPaymentReceived);


router.get('/reminderdetails/:id', verifyToken,checkUserType(['client']), getSingleReminderDetail);

module.exports = router;
