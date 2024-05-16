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
  plan_id: { type: Schema.Types.ObjectId, ref: 'PayReminderPlan' },
  planStartDate: { type: Date },
  planEndDate: { type: Date },
  plan_status: { type: String, enum: ['Active', 'Expired', 'Canceled']},
  trail_taken: { type: Boolean, default: false },
  plan_type: { type: String, enum: ['Free', 'Paid']},
});
module.exports = mongoose.model('PayReminderPlan', PayReminderPlanSchema);
