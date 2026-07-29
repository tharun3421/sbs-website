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
    const logo = req.files?.logo?.[0]?.path || '';
    const reelUrl = req.files?.reel?.[0]?.path || '';
    const job = await Job.create({ ...req.body, logo, reelUrl });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const update = { ...req.body };
    delete update._id;
    delete update.__v;
    delete update.createdAt;
    delete update.updatedAt;
    if (req.files?.logo?.[0]) update.logo = req.files.logo[0].path;
    if (req.files?.reel?.[0]) update.reelUrl = req.files.reel[0].path;
    const job = await Job.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
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