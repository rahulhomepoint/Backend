const HomeAbout = require('../../models/HomeAbout');

// Add HomeAbout (only if one doesn't exist)
exports.addHomeAbout = async (req, res) => {
  try {
    const existing = await HomeAbout.findOne();
    if (existing) {
      return res.status(409).json({ success: false, message: 'An entry already exists. Use the edit endpoint to update.' });
    }
    const homeAbout = new HomeAbout(req.body);
    await homeAbout.save();
    res.status(201).json({ success: true, data: homeAbout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Edit the single HomeAbout entry
exports.editHomeAbout = async (req, res) => {
  try {
    const homeAbout = await HomeAbout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!homeAbout) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: homeAbout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get the single HomeAbout entry
exports.getHomeAbout = async (req, res) => {
  try {
    const homeAbout = await HomeAbout.findOne();
    if (!homeAbout) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: homeAbout });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 