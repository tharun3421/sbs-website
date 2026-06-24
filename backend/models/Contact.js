const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  phone: { type: String, required: true },
}, { _id: false });

const districtSchema = new mongoose.Schema({
  district: { type: String, required: true },
  persons:  [personSchema],
}, { _id: false });

const contactSchema = new mongoose.Schema({
  state:     { type: String, required: true },
  order:     { type: Number, default: 0 },
  districts: [districtSchema],
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);