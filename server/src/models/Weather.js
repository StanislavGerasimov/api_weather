const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  recordedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

WeatherSchema.index({ city: 1 });

module.exports = mongoose.model('Weather', WeatherSchema);