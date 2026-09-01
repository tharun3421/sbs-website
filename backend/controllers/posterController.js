const { v2: cloudinary } = require('cloudinary');
const Poster = require('../models/Poster');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CATEGORIES = ['visa', 'freelance'];

const validateCategory = (category, res) => {
  if (!CATEGORIES.includes(category)) {
    res.status(400).json({ message: 'Category must be "visa" or "freelance"' });
    return false;
  }
  return true;
};

// Public: only active posters for a category, admin-defined order first.
exports.getPosters = async (req, res) => {
  try {
    const { category } = req.params;
    if (!validateCategory(category, res)) return;
    const posters = await Poster.find({ category, isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(posters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: every poster (active + hidden) for a category, for management.
exports.getAllPosters = async (req, res) => {
  try {
    const { category } = req.params;
    if (!validateCategory(category, res)) return;
    const posters = await Poster.find({ category }).sort({ order: 1, createdAt: -1 });
    res.json(posters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Signs a Cloudinary upload request so the browser uploads the poster image
// directly to Cloudinary, bypassing Vercel's ~4.5MB serverless body limit
// (same pattern as the Associate Resources upload flow).
exports.getUploadSignature = async (req, res) => {
  try {
    const folder = 'sbs-posters';
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, process.env.CLOUDINARY_API_SECRET);

    res.json({
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPoster = async (req, res) => {
  try {
    const { category, title, imageUrl, isActive, order } = req.body;
    if (!validateCategory(category, res)) return;
    if (!imageUrl || !imageUrl.trim()) return res.status(400).json({ message: 'A poster image is required' });

    const poster = await Poster.create({
      category,
      title: (title || '').trim(),
      imageUrl: imageUrl.trim(),
      ...(isActive !== undefined ? { isActive } : {}),
      ...(order !== undefined ? { order } : {}),
    });
    res.status(201).json(poster);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePoster = async (req, res) => {
  try {
    const { title, imageUrl, isActive, order } = req.body;
    const update = {};
    if (title !== undefined) update.title = title.trim();
    if (imageUrl && imageUrl.trim()) update.imageUrl = imageUrl.trim();
    if (isActive !== undefined) update.isActive = isActive;
    if (order !== undefined) update.order = order;

    const poster = await Poster.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!poster) return res.status(404).json({ message: 'Poster not found' });
    res.json(poster);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePoster = async (req, res) => {
  try {
    await Poster.findByIdAndDelete(req.params.id);
    res.json({ message: 'Poster deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};