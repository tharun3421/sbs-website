const Offer = require('../models/Offer');

exports.getOffers = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = new RegExp(category, 'i');
    if (search) filter.$or = [
      { company: new RegExp(search, 'i') },
      { title: new RegExp(search, 'i') }
    ];
    const offers = await Offer.find(filter).sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOffer = async (req, res) => {
  try {
    const image = req.file ? req.file.path : '';
    const offer = await Offer.create({ ...req.body, image });
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.image = req.file.path;
    const offer = await Offer.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(offer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};