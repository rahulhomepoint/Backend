const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/Dashboard/ReviewController');

// Add a review
router.post('/reviews', ReviewController.addReview);

// Get all reviews
router.get('/reviews', ReviewController.getReviews);

// Update a review
router.put('/reviews/:id', ReviewController.updateReview);

// Delete a review
router.delete('/reviews/:id', ReviewController.deleteReview);

module.exports = router; 