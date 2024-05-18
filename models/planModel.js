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
  total_companies: { type: Number, required: true }, // -1 unlimited 
  total_customers_in_company: { type: Number, required: true }, // -1 unlimited 
  total_sms: { type: Number, required: true },// -1 unlimited 
  total_email: { type: Number, required: true } // -1 unlimited 

});
module.exports = mongoose.model('PayReminderPlan', PayReminderPlanSchema);
