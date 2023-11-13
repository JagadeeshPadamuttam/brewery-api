// server/routes/breweries.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { city, name, type } = req.query;
    const response = await axios.get(`https://api.openbrewerydb.org/breweries?by_city=${city}&by_name=${name}&by_type=${type}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//
router.get('/details/:breweryId', async (req, res) => {
  try {
    const breweryId = req.params.breweryId;
    const breweryDetails = await axios.get(`https://api.openbrewerydb.org/breweries/${breweryId}`);
    const reviews = await Review.find({ breweryId });
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviews.length;
    breweryDetails.data.averageRating = averageRating;
    res.json(breweryDetails.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
