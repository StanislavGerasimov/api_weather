const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['hourly', 'daily'],
    default: 'daily'
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  confirmationToken: {
    type: String,
    required: true
  },
  unsubscribeToken: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

SubscriptionSchema.index({ email: 1, city: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);