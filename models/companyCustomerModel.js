const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayReminderCompanyCustomerSchema = new Schema({
  company_id: { type: Schema.Types.ObjectId, ref: 'PayReminderCompany', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  dateCreated: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  dateUpdated: { type: Date },
});