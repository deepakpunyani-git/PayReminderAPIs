// models/PayReminderContactus.js
const mongoose = require('mongoose');

const PayReminderContactusSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  datecreated: { type: Date, default: Date.now },
  send_by: { type: mongoose.Schema.Types.ObjectId, ref: 'PayReminderUser' },
  status: { type: String, enum: ['pending', 'read'], default: 'pending' },
});

module.exports = mongoose.model('PayReminderContactus', PayReminderContactusSchema);
