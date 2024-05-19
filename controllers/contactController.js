const PayReminderContactus = require('../models/ContactusModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const secretKey = process.env.JWT_SECRET;

exports.addMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
 
    const { name, email, message } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    var userId;
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
          userId = decoded?._id;
      });
    }
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
      if (fromDate && toDate) {
        // If both fromDate and toDate are provided
        filter.datecreated.$gte = new Date(fromDate);
        filter.datecreated.$lte = new Date(toDate);
      } else if (fromDate) {
        // If only fromDate is provided
        filter.datecreated.$gte = new Date(fromDate);
      } else {
        // If only toDate is provided
        filter.datecreated.$lte = new Date(toDate);
      }
    }

    // Sorting parameter
    const sortField = req.query.sortBy || 'status';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    const sort = { [sortField]: sortOrder };

    // Fetch total count for pagination
    const totalCount = await PayReminderContactus.countDocuments(filter);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch messages based on filters, sort, and pagination
    const messages = await PayReminderContactus.find(filter)
      .sort(sort)
      .skip(skipIndex)
      .limit(limit)
      .lean()
      .populate('send_by', 'name email'); 

    // Prepare response
    const response = {
      totalPages,
      currentPage: page,
      messages
    };

    res.json(response);
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
    const { messageId } = req.params;
    const { status } = req.body;

      const message = await PayReminderContactus.findById(messageId);
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      if (message.status === status) {
        return res.status(400).json({ message: `Message status is already "${status}"` });
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