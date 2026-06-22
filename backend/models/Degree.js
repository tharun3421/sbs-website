const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  university: { type: String, required: true },
  logo: { type: String, default: '' },
  course: { type: String, required: true },
  duration: { type: String, default: '3 Year Program' },
  type: { type: String, default: 'UGC Recognized' },
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Degree', degreeSchema);
