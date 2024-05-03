const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayReminderPlanSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  dateCreated: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  dateUpdated: { type: Date },
  // Add other plan schema fields here
});
module.exports = mongoose.model('PayReminderPlan', PayReminderPlanSchema);
