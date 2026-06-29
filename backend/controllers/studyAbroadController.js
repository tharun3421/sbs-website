const StudyAbroad = require('../models/StudyAbroad');

exports.getListings = async (req, res) => {
  try {
    const listings = await StudyAbroad.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await StudyAbroad.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createListing = async (req, res) => {
  try {
    const { country, program, matter } = req.body;
    const listing = await StudyAbroad.create({ country, program, matter });
    res.status(201).json(listing);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateListing = async (req, res) => {
  try {
    const { country, program, matter, isActive } = req.body;
    const listing = await StudyAbroad.findByIdAndUpdate(
      req.params.id,
      { country, program, matter, isActive },
      { new: true }
    );
    res.json(listing);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteListing = async (req, res) => {
  try {
    await StudyAbroad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};