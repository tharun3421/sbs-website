const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  logo: { type: String, default: '' },
  reelUrl: { type: String, default: '' },
  location: { type: String, required: true },
  salary: { type: String, default: 'Negotiable' },
  type: { type: String, enum: ['free', 'paid', 'tally'], default: 'free' },
  category: { type: String, default: 'General' },
  description: { type: String, default: '' },
  experience: { type: String, default: 'Fresher' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);