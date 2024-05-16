const PaymentHistorySchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'PayReminderUser', required: true },
    plan_id: { type: Schema.Types.ObjectId, ref: 'PayReminderPlan', required: true },
    amount: { type: Number, required: true },
    date_start: { type: Date, required: true },
    date_end: { type: Date, required: true },
    timestamp: { type: Date, default: Date.now }
  });
  
  const PaymentHistory = mongoose.model('PaymentHistory', PaymentHistorySchema);
  
  module.exports = PaymentHistory;
  