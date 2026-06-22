const Contact = require('../models/Contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ order: 1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
