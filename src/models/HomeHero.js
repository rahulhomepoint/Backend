const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
  brokerage: { type: Number, required: true },
  projects: { type: Number, required: true },
  developers: { type: Number, required: true },
  happyClient: { type: Number, required: true }
}, { _id: false });

const homeHeroSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  value: { type: valueSchema, required: true }
}, { timestamps: true });

module.exports = mongoose.model('HomeHero', homeHeroSchema); 