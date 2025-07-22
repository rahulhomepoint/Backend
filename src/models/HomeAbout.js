const mongoose = require('mongoose');

const homeAboutSchema = new mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('HomeAbout', homeAboutSchema); 