const OtherService = require('../models/OtherService');

exports.getServices = async (req, res) => {
  try {
    const services = await OtherService.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(services);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await OtherService.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createService = async (req, res) => {
  try {
    const service = await OtherService.create({ name: req.body.name });
    res.status(201).json(service);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateService = async (req, res) => {
  try {
    const service = await OtherService.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, isActive: req.body.isActive },
      { new: true }
    );
    res.json(service);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteService = async (req, res) => {
  try {
    await OtherService.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};