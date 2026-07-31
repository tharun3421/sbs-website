const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, trim: true, default: 'General' },
  type: { type: String, enum: ['image', 'video', 'link'], required: true },
  url: { type: String, required: true },
  // Only used when type === 'link' (e.g. YouTube, Instagram, Facebook, WhatsApp)
  platform: { type: String, trim: true, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

resourceSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Resource', resourceSchema);