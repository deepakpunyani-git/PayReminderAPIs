const PayReminderContactus = require('../models/PayReminderContactus');
const { validationResult } = require('express-validator');

exports.addMessage = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
 
    const { name, email, message } = req.body;
    const newMessage = new PayReminderContactus({
      name,
      email,
      message,
      datecreated: Date.now(),
      send_by: req.user.id, // Assuming user ID is stored in req.user.id
      status: 'pending',
      ip_address: req.ip
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
    const messages = await PayReminderContactus.find().sort({ datecreated: -1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.changeStatus = async (req, res) => {
  // Validate input
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
