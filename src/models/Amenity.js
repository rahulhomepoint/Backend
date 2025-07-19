const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
  image: { data: Buffer, contentType: String },
  title: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Amenity', AmenitySchema); 