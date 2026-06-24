require('dotenv').config();
const mongoose = require('mongoose');

const personSchema   = new mongoose.Schema({ name: String, phone: String }, { _id: false });
const districtSchema = new mongoose.Schema({ district: String, persons: [personSchema] }, { _id: false });
const contactSchema  = new mongoose.Schema({ state: String, order: Number, districts: [districtSchema] }, { timestamps: true });
const Contact = mongoose.model('Contact', contactSchema);

const contacts = [
  {
    order: 1,
    state: 'Andhra Pradesh',
    districts: [
      {
        district: 'Visakhapatnam',
        persons: [
          { name: 'Vijay',  phone: '9010699963' },
          { name: 'Suraj',  phone: '7330907102' },
        ],
      },
      {
        district: 'Kurnool',
        persons: [
          { name: 'Ramajaneyulu', phone: '9866071983' },
        ],
      },
      {
        district: 'Chittur',
        persons: [
          { name: 'Hari', phone: '9177516679' },
        ],
      },
      {
        district: 'Vijayawada',
        persons: [
          { name: 'Chandrashekar',              phone: '9133949509' },
          { name: 'Sri Satya Sai Shaik Suhel Basha', phone: '7893193160' },
          { name: 'Prakasam Narendra',          phone: '7675084576' },
        ],
      },
      {
        district: 'Nellore',
        persons: [
          { name: 'Mahesh Reddy', phone: '9110312358' },
        ],
      },
    ],
  },
  {
    order: 2,
    state: 'Telangana',
    districts: [
      {
        district: 'Nizamabad',
        persons: [{ name: 'Prudvi', phone: '7995913881' }],
      },
      {
        district: 'Nalgonda',
        persons: [{ name: 'CN Kumaar', phone: '9014465255' }],
      },
      {
        district: 'Khammam',
        persons: [{ name: 'Raju', phone: '8686653496' }],
      },
      {
        district: 'Karimnagar',
        persons: [{ name: 'Prabhakar', phone: '7780774251' }],
      },
      {
        district: 'Hyderabad',
        persons: [
          { name: 'Uday Kumar',     phone: '9296003018' },
          { name: 'Gopinath Reddy', phone: '9440760007' },
          { name: 'Srikanth',       phone: '7794905808' },
        ],
      },
      {
        district: 'Badhradi Kothagudem',
        persons: [{ name: 'Gouse Pasha', phone: '9154808434' }],
      },
    ],
  },
  {
    order: 3,
    state: 'Karnataka',
    districts: [
      {
        district: 'Bangalore',
        persons: [{ name: 'Gururaj', phone: '8050783006' }],
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Contact.deleteMany({});
  const result = await Contact.insertMany(contacts);
  console.log(`✅ Seeded ${result.length} state contact cards`);
  mongoose.disconnect();
}

seed().catch(err => { console.error('❌', err.message); process.exit(1); });