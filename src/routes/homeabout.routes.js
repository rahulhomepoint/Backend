const express = require('express');
const router = express.Router();
const {
  addHomeAbout,
  editHomeAbout,
  getHomeAbout,
} = require('../controllers/Dashboard/HomeAboutController');

// Add HomeAbout (create once)
router.post('/homeabout', addHomeAbout);
// Edit the single HomeAbout entry
router.put('/homeabout/:id', editHomeAbout);
// Get the single HomeAbout entry
router.get('/homeabout', getHomeAbout);

module.exports = router; 