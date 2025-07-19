const express = require('express');
const router = express.Router();
const multer = require('multer');
const AmenityController = require('../controllers/Dashboard/AmenityController');

// Use memory storage for multer
const upload = multer({ storage: multer.memoryStorage() });

// Create a new amenity
router.post('/amenities', upload.single('image'), AmenityController.createAmenity);

// List all amenities
router.get('/amenities', AmenityController.listAmenities);

module.exports = router; 