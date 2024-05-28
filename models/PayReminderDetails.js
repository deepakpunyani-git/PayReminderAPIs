const mongoose = require('mongoose');

const PayReminderDetailsSchema = new mongoose.Schema({
  payReminderID: { type: mongoose.Schema.Types.ObjectId, ref: 'PayReminder', required: true },
  notificationDate: { type: Date, required: true },
  paymentDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed', 'stop'], default: 'pending' },
  paymentReceived: { type: Boolean, default: false },
  amount: { type: Number, required: true }
});

const PayReminderDetails = mongoose.model('PayReminderDetails', PayReminderDetailsSchema);
module.exports = PayReminderDetails;
