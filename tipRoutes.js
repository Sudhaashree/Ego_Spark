const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');

router.get('/', async (req, res) => {
  const tips = await Tip.find();
  res.json(tips);
});

module.exports = router;
