const express = require('express');
const router = express.Router();
const {
  addHomeHero,
  editHomeHero,
  getAllHomeHero,
  getHomeHero,
  deleteHomeHero
} = require('../controllers/Dashboard/HomeHeroController');

// Add HomeHero
router.post('/homehero', addHomeHero);
// Edit HomeHero
router.put('/homehero/:id', editHomeHero);
// View all HomeHero
router.get('/homehero', getAllHomeHero);
// View single HomeHero
router.get('/homehero/:id', getHomeHero);
// Delete HomeHero
router.delete('/homehero/:id', deleteHomeHero);

module.exports = router; 