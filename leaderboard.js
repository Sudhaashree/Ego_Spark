const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Top users by ecoPoints
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ ecoPoints: -1 }).limit(10).select('name ecoPoints');
    res.json(users);
  } catch(err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/add-points', async (req, res) => {
  try {
    const { userId, points } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.ecoPoints += points;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
