const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  company: { type: String, required: true },
  image: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'General' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
