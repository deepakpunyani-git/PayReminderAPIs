const PayReminderContactus = require('../models/ContactusModel');
const { validationResult } = require('express-validator');

exports.addMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
 
    const { name, email, message } = req.body;
    var userId = req.user && req.user._id ? req.user._id : null;

    const isLimitReached = await checkMessageLimit(email);

    if (isLimitReached) {
        return res.status(400).json({ error: "Message limit reached for today." });
    }

    const newMessage = new PayReminderContactus({
      name,
      email,
      message,
      datecreated: Date.now(),
      send_by: userId,
      status: 'pending',
    });

    // Save message
    await newMessage.save();

    res.json({ message: 'Message added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.listMessages = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    // Filter parameters
    const { status, fromDate, toDate } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (fromDate || toDate) {
      filter.datecreated = {};
      if (fromDate) filter.datecreated.$gte = new Date(fromDate);
      if (toDate) filter.datecreated.$lte = new Date(toDate);
    }

    // Sorting parameter
    const sortField = req.query.sortBy || 'status';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    const sort = { [sortField]: sortOrder };

    // Fetch messages based on filters, sort, and pagination
    const messages = await PayReminderContactus.find(filter)
      .sort(sort)
      .skip(skipIndex)
      .limit(limit)
      .lean(); 
      
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.changeStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { messageId, status } = req.body;

    if (status === 'read') {
      const message = await PayReminderContactus.findById(messageId);
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      if (message.status === 'read') {
        return res.status(400).json({ message: 'Message status is already "read"' });
      }
    }

    // Update message status
    await PayReminderContactus.findByIdAndUpdate(messageId, { status, status_chanaced_by: req.user.id, status_chnaged_date: Date.now() });

    res.json({ message: 'Message status changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


async function checkMessageLimit(email) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const messagesCount = await PayReminderContactus.countDocuments({
      $or: [{ email }],
      datecreated: { $gte: today }
  });

  return messagesCount >= 3;
}