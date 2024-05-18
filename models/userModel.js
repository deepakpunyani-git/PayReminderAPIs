const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const PayReminderUserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number }, 
  gender: { type: String, enum: ['male', 'female', 'other'] },
  profile_pic: { type: String } ,
  username: String,
  email: { type: String, required: true },
  email_otp: { type: Number},
  email_otp_dateCreated: { type: Date},
  email_otp_expiresAt: { type: Date},
  password: String, 
  googleId: String,
  status: { type: String, enum: ['active', 'inactive'] , default: 'active' }, 
  usertype: { type: String,enum: ['admin', 'staff','client'], default: 'client' }, 
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date, 
  createdBy: { type: Schema.Types.ObjectId, ref: 'PayReminderUser' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'PayReminderUser' },
  plan_id: { type: Schema.Types.ObjectId, ref: 'PayReminderPlan' },
  planStartDate: { type: Date },
  planEndDate: { type: Date },
  plan_status: { type: String, enum: ['Active', 'Expired', 'Canceled']},
  plan_type: { type: String, enum: ['Free', 'Paid']},
  trail_taken: { type: Boolean, default: false },
  total_companies: { type: Number }, // -1 unlimited 
  total_customers_in_company: { type: Number }, // -1 unlimited 
  total_sms: { type: Number },// -1 unlimited 
  total_email: { type: Number }, // -1 unlimited 
  trailStartDate: { type: Date },
  trailEndDate: { type: Date },
});

PayReminderUserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
      return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
      throw new Error(error);
  }
};

module.exports = mongoose.model('PayReminderUser', PayReminderUserSchema);
