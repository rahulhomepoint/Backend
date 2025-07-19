const Amenity = require("../../models/Amenity");

// Create a new amenity (expects req.file for image)
exports.createAmenity = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image is required" });
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const amenity = new Amenity({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      title,
    });
    await amenity.save();
    res.status(201).json({
      _id: amenity._id,
      title: amenity.title,
      createdAt: amenity.createdAt,
      updatedAt: amenity.updatedAt,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List all amenities (return image as base64 string)
exports.listAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find();
    const result = amenities.map((a) => ({
      _id: a._id,
      title: a.title,
      image:
        a.image && a.image.data
          ? `data:${a.image.contentType};base64,${a.image.data.toString(
              "base64"
            )}`
          : null,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
