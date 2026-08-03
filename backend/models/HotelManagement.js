const mongoose = require('mongoose');

const hotelManagementSchema = new mongoose.Schema({
  country:       { type: String, enum: ['India', 'Mauritius'], required: true },
  title:         { type: String, required: true },       // e.g. "Free Hotel Management Diploma"
  subtitle:      { type: String, default: '' },           // e.g. "100% Job Guaranteed Program"
  duration:      { type: String, default: '' },           // e.g. "12 Months"
  internship:    { type: String, default: '' },           // e.g. "6 Months Paid Internship + Free Food & Accommodation"
  fee:           { type: String, default: '' },           // e.g. "₹15,000 (Uniform + Exam Fee Only)"
  certifiedBy:   { type: String, default: '' },           // e.g. "JNCTE – Globally Valid"
  eligibility:   { type: [String], default: [] },         // e.g. ["10th Pass or Above", ...]
  highlights:    { type: [String], default: [] },         // "Why Choose This Program"
  curriculum:    { type: [String], default: [] },         // "What You'll Learn"
  jobRoles:      { type: [String], default: [] },         // "Job Opportunities"
  isActive:      { type: Boolean, default: true },
  order:         { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('HotelManagement', hotelManagementSchema);