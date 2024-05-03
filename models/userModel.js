const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayReminderUserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  dateCreated: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  dateUpdated: { type: Date },
  // Add other user schema fields here
});

module.exports = mongoose.model('PayReminderUser', PayReminderUserSchema);
