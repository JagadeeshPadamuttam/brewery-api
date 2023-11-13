

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  breweryId: String,
  rating: Number,
  description: String,
});

module.exports = mongoose.model('Review', reviewSchema);
