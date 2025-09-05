const mongoose = require('mongoose');

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  review: { type: String, required: true },
  image: { type: String, default: '/UserPhoto/default.png' },
});

// Correct collection name 'reviews' instead of 'reviwe'
const Review = mongoose.model('review', reviewSchema, 'reviews');

module.exports = Review;
