const mongoose = require('mongoose');

const associateSchema = new mongoose.Schema({
  name:             { type: String, required: true, trim: true },
  mobile:           { type: String, required: true, unique: true, trim: true },
  associateId:      { type: String, required: true, unique: true, trim: true },
  password:         { type: String, required: true },
  isDefaultPassword:{ type: Boolean, default: true },
  isActive:         { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Associate', associateSchema);