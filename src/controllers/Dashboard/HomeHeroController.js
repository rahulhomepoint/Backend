const HomeHero = require('../../models/HomeHero');

// Add HomeHero
exports.addHomeHero = async (req, res) => {
  try {
    const homeHero = new HomeHero(req.body);
    await homeHero.save();
    res.status(201).json({ success: true, data: homeHero });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Edit HomeHero
exports.editHomeHero = async (req, res) => {
  try {
    const homeHero = await HomeHero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!homeHero) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: homeHero });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// View all HomeHero
exports.getAllHomeHero = async (req, res) => {
  try {
    const homeHeroes = await HomeHero.find();
    res.json({ success: true, data: homeHeroes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View single HomeHero
exports.getHomeHero = async (req, res) => {
  try {
    const homeHero = await HomeHero.findById(req.params.id);
    if (!homeHero) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: homeHero });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete HomeHero
exports.deleteHomeHero = async (req, res) => {
  try {
    const homeHero = await HomeHero.findByIdAndDelete(req.params.id);
    if (!homeHero) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 