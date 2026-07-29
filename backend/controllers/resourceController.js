const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createResource = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'A file is required' });
    const isVideo = /^video\//.test(req.file.mimetype);
    const resource = await Resource.create({
      title: req.body.title,
      type: isVideo ? 'video' : 'image',
      url: req.file.path,
    });
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const update = { title: req.body.title, isActive: req.body.isActive };
    if (req.file) {
      update.type = /^video\//.test(req.file.mimetype) ? 'video' : 'image';
      update.url = req.file.path;
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