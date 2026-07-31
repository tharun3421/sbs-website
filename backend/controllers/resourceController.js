const Resource = require('../models/Resource');

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

exports.createResource = async (req, res) => {
  try {
    const { title, category, type, isActive } = req.body;

    if (!category || !category.trim()) {
      return res.status(400).json({ message: 'Category is required' });
    }

    if (type === 'link') {
      if (!req.body.url || !req.body.url.trim()) {
        return res.status(400).json({ message: 'A URL is required for a social media link' });
      }
      const resource = await Resource.create({
        title,
        category: category.trim(),
        type: 'link',
        url: req.body.url.trim(),
        platform: (req.body.platform || '').trim(),
        ...(isActive !== undefined ? { isActive } : {}),
      });
      return res.status(201).json(resource);
    }

    if (!req.file) return res.status(400).json({ message: 'An image or video file is required' });
    const isVideo = /^video\//.test(req.file.mimetype);
    const resource = await Resource.create({
      title,
      category: category.trim(),
      type: isVideo ? 'video' : 'image',
      url: req.file.path,
      ...(isActive !== undefined ? { isActive } : {}),
    });
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const update = { title: req.body.title, isActive: req.body.isActive };
    if (req.body.category && req.body.category.trim()) {
      update.category = req.body.category.trim();
    }

    if (req.body.type === 'link') {
      update.type = 'link';
      if (req.body.url && req.body.url.trim()) update.url = req.body.url.trim();
      update.platform = (req.body.platform || '').trim();
    } else if (req.file) {
      update.type = /^video\//.test(req.file.mimetype) ? 'video' : 'image';
      update.url = req.file.path;
      update.platform = '';
    }

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