const HotelManagement = require('../models/HotelManagement');

// Public: active listings, optionally filtered by country
exports.getListings = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.country) filter.country = req.query.country;
    const listings = await HotelManagement.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(listings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Admin: all listings, optionally filtered by country
exports.getAllListings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.country) filter.country = req.query.country;
    const listings = await HotelManagement.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(listings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createListing = async (req, res) => {
  try {
    const {
      country, title, subtitle, duration, internship, fee, certifiedBy,
      eligibility, highlights, curriculum, jobRoles, order
    } = req.body;
    const listing = await HotelManagement.create({
      country, title, subtitle, duration, internship, fee, certifiedBy,
      eligibility, highlights, curriculum, jobRoles, order
    });
    res.status(201).json(listing);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateListing = async (req, res) => {
  try {
    const {
      country, title, subtitle, duration, internship, fee, certifiedBy,
      eligibility, highlights, curriculum, jobRoles, isActive, order
    } = req.body;
    const listing = await HotelManagement.findByIdAndUpdate(
      req.params.id,
      { country, title, subtitle, duration, internship, fee, certifiedBy,
        eligibility, highlights, curriculum, jobRoles, isActive, order },
      { new: true, runValidators: true }
    );
    res.json(listing);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteListing = async (req, res) => {
  try {
    await HotelManagement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};