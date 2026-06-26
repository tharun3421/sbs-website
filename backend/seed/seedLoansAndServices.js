const mongoose = require('mongoose');
const LoanCategory = require('../models/LoanCategory');
const OtherService = require('../models/OtherService');
require('dotenv').config();

const loans = [
  'Personal Loan', 'Business Loan', 'Education Loan', 'Private Finance',
  'BG', 'LoC', 'OD/CC', 'LAP', 'VC'
];

const services = [
  'DPR', 'Funding', 'Trainings', 'YouTube / Movie / OTT',
  'Business Development', 'Crisis Management', 'PR & Networking'
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await LoanCategory.deleteMany({});
  await OtherService.deleteMany({});
  await LoanCategory.create(loans.map(name => ({ name })));
  await OtherService.create(services.map(name => ({ name })));
  console.log('Seeded loans and services');
  process.exit();
});