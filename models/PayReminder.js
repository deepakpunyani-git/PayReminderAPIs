const mongoose = require('mongoose');

const PayReminderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  emailSubject: { type: String },
  emailContent: { type: String },
  reminderStartDate: { type: Date},
  numberOfPayments: { type: Number},
  notifyBeforeDays: { type: Number},
  paymentAmountPerInstallment: { type: Number},
  paymentAmount: { type: Number},
  recurringNotificationDays: { type: Number},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'PayReminderUser' },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date },
  useCustomContent: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'completed','stop'], default: 'pending' }
});

const PayReminder = mongoose.model('PayReminder', PayReminderSchema);
module.exports = PayReminder;
