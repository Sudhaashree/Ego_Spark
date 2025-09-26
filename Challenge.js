const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rewardPoints: { type: Number, required: true }
});

module.exports = mongoose.model('Challenge', challengeSchema);
