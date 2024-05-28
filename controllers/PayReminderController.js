const PayReminder = require('../models/PayReminder');
const PayReminderDetails = require('../models/PayReminderDetails');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');

const generatePayReminderDetails = (reminder) => {
  const details = [];
  var paymentDate = new Date(reminder.reminderStartDate);
  var paymentDateStart = paymentDate;
  const today = new Date();

  for (let i = 0; i < reminder.numberOfPayments; i++) {

    if(i>0){
      paymentDateStart.setDate(paymentDateStart.getDate() + reminder.recurringNotificationDays);
    }
   
    var notificationDate = new Date(paymentDateStart);
    var paymentDateFinal = new Date(paymentDateStart);
    notificationDate.setDate(notificationDate.getDate() - reminder.notifyBeforeDays);

    if (notificationDate <= today && today <= paymentDateFinal) {
      notificationDate = new Date(paymentDateFinal)
    } 


    details.push({
        payReminderID: reminder._id,
        notificationDate: notificationDate,
        paymentDate: paymentDateFinal,
        status: 'pending',
        paymentReceived: false,
        amount: reminder.paymentAmountPerInstallment,
    });
  }
  return details;
};

// Create Reminder
exports.createReminder = async (req, res) => {
  const { name, email, reminderStartDate, numberOfPayments, notifyBeforeDays, paymentAmountPerInstallment, recurringNotificationDays } = req.body;
  const paymentAmount =  paymentAmountPerInstallment * numberOfPayments
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }

    const reminder = new PayReminder({
      name,
      email,
      reminderStartDate,
      numberOfPayments,
      notifyBeforeDays,
      paymentAmount,
      paymentAmountPerInstallment,
      recurringNotificationDays,
      user: req.user._id,
    });

    await reminder.save();

    const details = generatePayReminderDetails(reminder);
    await PayReminderDetails.insertMany(details);

    res.status(201).json({ reminder, details });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Reminder
exports.updateReminder = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email } = req.body;

  try {

    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }

    let reminder = await PayReminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    if (reminder.user._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    reminder.name = name;
    reminder.email = email;
    await reminder.save();

    res.status(200).json({ message: 'Reminder updated successfully', reminder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// View Single Reminder
exports.getSingleReminder = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }

    const reminder = await PayReminder.findById(req.params.id).populate('user', 'name email');

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }


    if (reminder.user._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const details = await PayReminderDetails.find({ payReminderID: reminder._id });

    res.status(200).json({ reminder, details });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View All Reminders
exports.getAllReminders = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }
    const { page = 1, limit = 10, name, reminderStartDateFrom, reminderStartDateTo, sortBy = 'reminderStartDate', order = 'asc' } = req.query;

    // Build the query object
    const query = { user: req.user._id };
    if (name) {
      query.name = new RegExp(name, 'i'); // case-insensitive search
    }
    if (reminderStartDateFrom || reminderStartDateTo) {
      query.reminderStartDate = {};
      if (reminderStartDateFrom) {
        query.reminderStartDate.$gte = new Date(reminderStartDateFrom);
      }
      if (reminderStartDateTo) {
        query.reminderStartDate.$lte = new Date(reminderStartDateTo);
      }
    }

    // Sorting
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    // Pagination
    const reminders = await PayReminder.find(query, { user: 0 })
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await PayReminder.countDocuments(query);

    res.status(200).json({
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
      reminders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.stopReminder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }


    // Update the PayReminder status to 'stop'
    const payReminder = await PayReminder.findByIdAndUpdate(id, { status: 'stop' }, { new: true });

    if (!payReminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    
    if (payReminder.user._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the status of PayReminderDetails to 'stop' where status is 'pending'
    await PayReminderDetails.updateMany({ payReminderID: id, status: 'pending' }, { status: 'stop' });

    res.status(200).json({ message: 'Reminder stopped successfully', payReminder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.updateCustomEmailContent = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }


    const { id } = req.params;
    const { emailSubject, emailContent, useCustomContent } = req.body;
    
    let reminder = await PayReminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
  

    const payReminder = await PayReminder.findByIdAndUpdate(
      id,
      { emailSubject, emailContent, useCustomContent },
      { new: true }
    );

    if (!payReminder) {
      return res.status(404).json({ message: 'PayReminder not found' });
    }

    res.status(200).json({ message: 'Custom email content updated successfully', payReminder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateReminderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { notificationDate, paymentDate, amount } = req.body;

    // Find the user
    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }

    // Find the reminder detail
    const reminderDetail = await PayReminderDetails.findById(id).populate('payReminderID');
    if (!reminderDetail) {
      return res.status(404).json({ message: 'Reminder detail not found' });
    }

    // Authorization check
    const payReminder = await PayReminder.findById(reminderDetail.payReminderID._id).populate('user');
    if (payReminder.user._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the reminder details
    reminderDetail.notificationDate = notificationDate;
    reminderDetail.paymentDate = paymentDate;
    reminderDetail.amount = amount;

    await reminderDetail.save();

    res.status(200).json({ message: 'Reminder details updated successfully', reminderDetail });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.stopSingleReminder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user
    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }

    // Find the reminder detail
    const reminderDetail = await PayReminderDetails.findById(id).populate('payReminderID');
    if (!reminderDetail) {
      return res.status(404).json({ message: 'Reminder detail not found' });
    }

    // Authorization check
    const payReminder = await PayReminder.findById(reminderDetail.payReminderID._id).populate('user');
    if (payReminder.user._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the status to 'stop'
    reminderDetail.status = 'stop';

    await reminderDetail.save();

    res.status(200).json({ message: 'Reminder status updated to stop', reminderDetail });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getSingleReminderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user
    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }

    // Find the reminder detail
    const reminderDetail = await PayReminderDetails.findById(id).populate('payReminderID');
    if (!reminderDetail) {
      return res.status(404).json({ message: 'Reminder detail not found' });
    }

    // Authorization check
    const payReminder = await PayReminder.findById(reminderDetail.payReminderID._id).populate('user');
    if (payReminder.user._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json({ reminderDetail });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.markPaymentReceived = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { paymentReceived } = req.body;

    // Validate paymentReceived field
    if (typeof paymentReceived !== 'boolean') {
      return res.status(400).json({ message: 'Payment received must be a boolean' });
    }

    // Find the user
    const user = await User.findById(req.user._id);
    if (!user.setup_completed) {
      return res.status(400).json({ message: 'Setup not complete' });
    }

    // Find the reminder detail
    const reminderDetail = await PayReminderDetails.findById(id).populate('payReminderID');
    if (!reminderDetail) {
      return res.status(404).json({ message: 'Reminder detail not found' });
    }

    // Authorization check
    const payReminder = await PayReminder.findById(reminderDetail.payReminderID._id).populate('user');
    if (payReminder.user._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the paymentReceived status
    reminderDetail.paymentReceived = paymentReceived;

    await reminderDetail.save();

    res.status(200).json({ message: 'Payment received status updated', reminderDetail });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
