const mongoose = require('mongoose');

// Shared model for the two admin-managed poster galleries shown on the
// public site: Visas and Freelance. Each poster is a single admin-uploaded
// image; only isActive posters are ever returned to public users.
const posterSchema = new mongoose.Schema({
  category: { type: String, enum: ['visa', 'freelance'], required: true },
  title: { type: String, trim: true, default: '' },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  // Lower numbers show first within a category; ties fall back to newest first.
  order: { type: Number, default: 0 },
}, { timestamps: true });

posterSchema.index({ category: 1, isActive: 1, order: 1, createdAt: -1 });

module.exports = mongoose.model('Poster', posterSchema);