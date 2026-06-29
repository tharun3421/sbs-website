const mongoose = require('mongoose');

const studyAbroadSchema = new mongoose.Schema({
  country:   { type: String, required: true },
  program:   { type: String, required: true },
  matter:    { type: String, required: true },
  isActive:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('StudyAbroad', studyAbroadSchema);