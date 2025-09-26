const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  title: String,
  description: String,
  ecoReason: String,
  imageUrl: String
});

module.exports = mongoose.model('Tip', tipSchema);
