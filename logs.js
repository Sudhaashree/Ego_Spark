const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const CrackerLog = require('../models/CrackerLog');
const User = require('../models/User');

// Add log
router.post('/', auth, async (req, res) => {
  try {
    const { crackerType, quantity, pollutionScore } = req.body;
    const log = new CrackerLog({ userId: req.user, crackerType, quantity, pollutionScore });
    await log.save();

    // Add points to user
    await User.findByIdAndUpdate(req.user, { $inc: { ecoPoints: pollutionScore } });

    res.json(log);
  } catch(err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user logs
router.get('/', auth, async (req, res) => {
  try {
    const logs = await CrackerLog.find({ userId: req.user }).sort({ date: 1 });
    res.json(logs);
  } catch(err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
