const express = require('express');
const router = express.Router();
// ENSURE THIS PATH IS CORRECT
const Restaurant = require('../models/Restaurant'); 

router.get('/', async (req, res) => {
  try {
    // We extract both from req.query to prevent 'undefined' errors
    const { category, search } = req.query; 
    let query = {};

    // Build the query object
    if (category && category !== 'All') {
      // Your model uses 'cuisine', so we query that field
      query.cuisine = { $in: [category] }; 
    }

    if (search) {
      // Regex for case-insensitive search
      query.name = { $regex: search, $options: 'i' }; 
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (err) {
    // If there is an error (like a missing model), this sends the 500
    console.error("Backend Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;