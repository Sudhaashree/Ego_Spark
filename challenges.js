const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// List all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch(err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
