const Review = require('../../models/Review');

// Add a new review
exports.addReview = async (req, res) => {
    try {
        const { name, image, work, message } = req.body;
        const review = new Review({ name, image, work, message });
        await review.save();
        res.status(201).json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all reviews
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, work, message } = req.body;
        const review = await Review.findByIdAndUpdate(
            id,
            { name, image, work, message },
            { new: true }
        );
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}; 