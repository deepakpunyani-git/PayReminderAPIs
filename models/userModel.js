const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayReminderUserSchema = new Schema({
  name: { type: String, required: true },
  username: String,
  email: { type: String, required: true },
  password: String, 
  googleId: String,
  status: { type: String, enum: ['active', 'inactive'] , default: 'active' }, 
  usertype: { type: String,enum: ['admin', 'staff','client'], default: 'client' }, 
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date, 
  createdBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'EventFlow-users' }
});


module.exports = mongoose.model('PayReminderUser', PayReminderUserSchema);
