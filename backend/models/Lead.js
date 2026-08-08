const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  associate:     { type: mongoose.Schema.Types.ObjectId, ref: 'Associate', required: true },
  associateName: { type: String, required: true },
  clientName:    { type: String, required: true, trim: true },
  mobile:        { type: String, required: true, trim: true },
  email:         { type: String, default: '', trim: true },
  businessName:  { type: String, default: '', trim: true },
  category:      { type: String, default: '', trim: true },
  city:          { type: String, default: '', trim: true },
  state:         { type: String, default: '', trim: true },
  notes:         { type: String, default: '' },
  status:        { type: String, enum: ['new', 'in_progress', 'converted', 'rejected'], default: 'new' },
}, { timestamps: true });

leadSchema.index({ clientName: 'text', businessName: 'text', mobile: 'text', email: 'text' });

module.exports = mongoose.model('Lead', leadSchema);