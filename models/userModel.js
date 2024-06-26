const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const PayReminderUserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number }, 
  gender: { type: String, enum: ['male', 'female', 'other'] },
  profile_pic: { type: String } ,
  username: String,
  email: { type: String},
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

  companyName: { type: String },
  companyEmail: { type: String},
  companyPhoneNumber: { type: String},
  emailSubject: { type: String },
  emailContent: { type: String },

  setup_completed:  { type: Boolean, default: false },

  block_user: { type: Boolean, default: false }


});

PayReminderUserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
      return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
      throw new Error(error);
  }
};

module.exports = mongoose.model('PayReminderUser', PayReminderUserSchema);
