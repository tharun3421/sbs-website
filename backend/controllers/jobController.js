const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  try {
    const { type, location, category, search } = req.query;
    const filter = { isActive: true };
    if (type) filter.type = type;
    if (location) filter.location = new RegExp(location, 'i');
    if (category) filter.category = new RegExp(category, 'i');
    if (search) filter.$or = [
      { title: new RegExp(search, 'i') },
      { company: new RegExp(search, 'i') }
    ];
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const logo = req.file ? req.file.path : '';
    const job = await Job.create({ ...req.body, logo });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.logo = req.file.path;
    const job = await Job.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Job removed' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};