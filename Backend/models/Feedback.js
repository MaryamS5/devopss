const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  rating: Number,
  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
