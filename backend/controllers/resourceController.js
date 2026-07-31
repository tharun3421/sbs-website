const { v2: cloudinary } = require('cloudinary');
const Resource = require('../models/Resource');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ isActive: true }).sort({ category: 1, createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ category: 1, createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Distinct list of categories already in use, so the admin can reuse
// existing categories instead of retyping/duplicating them.
exports.getCategories = async (req, res) => {
  try {
    const categories = await Resource.distinct('category');
    res.json(categories.filter(Boolean).sort((a, b) => a.localeCompare(b)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Signs a Cloudinary upload request so the browser can upload the file
// directly to Cloudinary, bypassing our Vercel serverless function's
// ~4.5MB request body limit entirely.
exports.getUploadSignature = async (req, res) => {
  try {
    const resourceType = req.query.resource_type === 'video' ? 'video' : 'image';
    const folder = resourceType === 'video' ? 'sbs-videos' : 'sbs-resources';
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

exports.createResource = async (req, res) => {
  try {
    const { title, category, type, url, platform, isActive } = req.body;

    if (!category || !category.trim()) return res.status(400).json({ message: 'Category is required' });
    if (!['image', 'video', 'link'].includes(type)) return res.status(400).json({ message: 'Invalid resource type' });
    if (!url || !url.trim()) return res.status(400).json({ message: 'A file or URL is required' });

    const resource = await Resource.create({
      title,
      category: category.trim(),
      type,
      url: url.trim(),
      platform: type === 'link' ? (platform || '').trim() : '',
      ...(isActive !== undefined ? { isActive } : {}),
    });
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const { title, category, type, url, platform, isActive } = req.body;
    const update = { title, isActive };

    if (category && category.trim()) update.category = category.trim();
    if (type) update.type = type;
    if (url && url.trim()) update.url = url.trim();
    update.platform = type === 'link' ? (platform || '').trim() : '';

    const resource = await Resource.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(resource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};