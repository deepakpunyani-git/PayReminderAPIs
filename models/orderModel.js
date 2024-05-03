const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayReminderOrderSchema = new Schema({
  client_id: { type: Schema.Types.ObjectId, ref: 'PayReminderUser', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  dateCreated: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  dateUpdated: { type: Date },
  // Add other order schema fields here
});

module.exports = mongoose.model('PayReminderOrder', PayReminderOrderSchema);
