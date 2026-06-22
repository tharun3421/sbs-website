const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  resumeUrl: { type: String, default: '' },
  refId: { type: mongoose.Schema.Types.ObjectId, refPath: 'refModel' },
  refModel: { type: String, enum: ['Job', 'Degree', 'Offer'] },
  refTitle: { type: String, default: '' },
  type: { type: String, enum: ['job', 'degree', 'offer'], required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
