const Degree = require('../models/Degree');

exports.getDegrees = async (req, res) => {
  try {
    const { course, search } = req.query;
    const filter = { isActive: true };
    if (course) filter.course = new RegExp(course, 'i');
    if (search) filter.$or = [
      { university: new RegExp(search, 'i') },
      { course: new RegExp(search, 'i') }
    ];
    const degrees = await Degree.find(filter).sort({ createdAt: -1 });
    res.json(degrees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDegree = async (req, res) => {
  try {
    const logo = req.file ? req.file.path : '';
    const degree = await Degree.create({ ...req.body, logo });
    res.status(201).json(degree);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateDegree = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.logo = req.file.path;
    const degree = await Degree.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(degree);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDegree = async (req, res) => {
  try {
    await Degree.findByIdAndDelete(req.params.id);
    res.json({ message: 'Degree deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllDegrees = async (req, res) => {
  try {
    const degrees = await Degree.find().sort({ createdAt: -1 });
    res.json(degrees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};