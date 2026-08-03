const Application = require('../models/Application');

const TYPE_TO_MODEL = { job: 'Job', degree: 'Degree', offer: 'Offer', loan: 'LoanCategory', other_service: 'OtherService', hotel_management: 'HotelManagement' };

exports.apply = async (req, res) => {
  try {
    const { name, mobile, refId, refTitle, type } = req.body;
    const resumeUrl = req.file ? req.file.path : '';
    const app = await Application.create({
      name,
      mobile,
      refId: refId || undefined,
      refModel: TYPE_TO_MODEL[type],
      refTitle,
      type,
      resumeUrl
    });
    res.status(201).json({ message: 'Application submitted successfully', app });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.enquire = async (req, res) => {
  try {
    const { name, mobile, refId, refTitle, type } = req.body;
    const app = await Application.create({
      name,
      mobile,
      refId: refId || undefined,
      refModel: TYPE_TO_MODEL[type],
      refTitle,
      type
    });
    res.status(201).json({ message: 'Enquiry submitted successfully', app });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { type, status, from, to } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    const apps = await Application.find(filter).sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    const header = 'Name,Mobile,Type,Applied For,Status,Date\n';
    const rows = apps.map(a =>
      `"${a.name}","${a.mobile}","${a.type}","${a.refTitle}","${a.status}","${a.createdAt.toLocaleDateString()}"`
    ).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=applications.csv');
    res.send(header + rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};