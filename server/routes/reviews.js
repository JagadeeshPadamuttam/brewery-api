// server/routes/reviews.js

const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/submit', async (req, res) => {
  try {
    const { breweryId, rating, description } = req.body;
    const review = new Review({ breweryId, rating, description });
    await review.save();
    res.json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/get/:breweryId', async (req, res) => {
  try {
    const breweryId = req.params.breweryId;
    const reviews = await Review.find({ breweryId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
