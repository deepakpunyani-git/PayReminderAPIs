const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayReminderPlanSchema = new Schema({
  name: { type: String, required: true },
  features: { type: [String], required: true },
  yearlyPrice: { type: Number, required: true },
  monthlyPrice: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'PayReminderUser' },
  dateCreated: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'PayReminderUser' },
  dateUpdated: { type: Date },
});
module.exports = mongoose.model('PayReminderPlan', PayReminderPlanSchema);
