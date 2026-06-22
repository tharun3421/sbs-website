const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  region: { type: String, required: true },
  address: { type: String, default: '' },
  phone: [{ type: String }],
  email: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
