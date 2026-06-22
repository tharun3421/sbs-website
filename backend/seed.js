require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');
const Degree = require('./models/Degree');
const Offer = require('./models/Offer');
const Contact = require('./models/Contact');
const Settings = require('./models/Settings');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([
    Job.deleteMany(), Degree.deleteMany(), Offer.deleteMany(),
    Contact.deleteMany(), Settings.deleteMany()
  ]);
  console.log('Cleared existing data');

  await Job.insertMany([
    { title: 'Assistant Manager', company: 'Paytm', location: 'Hyderabad', salary: '₹25,000 - ₹35,000', type: 'free', category: 'Finance', experience: '1-3 Years', description: 'Manage financial operations and customer relations.' },
    { title: 'Sales Executive', company: 'HDFC Bank', location: 'Vizag', salary: '₹20,000 - ₹30,000', type: 'free', category: 'Banking', experience: 'Fresher', description: 'Drive sales targets and maintain client relationships.' },
    { title: 'Software Developer', company: 'TCS', location: 'Hyderabad', salary: '₹40,000 - ₹60,000', type: 'free', category: 'IT', experience: '2-4 Years', description: 'Develop and maintain enterprise software solutions.' },
    { title: 'Data Entry Operator', company: 'Wipro', location: 'Eluru', salary: '₹15,000 - ₹20,000', type: 'free', category: 'Operations', experience: 'Fresher', description: 'Accurate data entry and record management.' },
    { title: 'Digital Marketing + Placement', company: 'DigiSkills Academy', location: 'Hyderabad', salary: '₹30,000 - ₹45,000', type: 'paid', category: 'Marketing', experience: 'Fresher', description: '3-month training program with 100% placement guarantee in digital marketing.' },
    { title: 'Full Stack Developer Training', company: 'TechBoost Institute', location: 'Vijayawada', salary: '₹50,000 - ₹80,000', type: 'paid', category: 'IT', experience: 'Fresher', description: '6-month intensive training in MERN stack with guaranteed job placement.' },
  ]);
  console.log('Jobs seeded');

  await Degree.insertMany([
    { university: 'Andhra University', course: 'Bachelor of Commerce (B.Com)', duration: '3 Year Program', type: 'UGC Recognized', description: 'Online B.Com from the prestigious Andhra University.' },
    { university: "Vignan's University", course: 'Bachelor of Business Administration (BBA)', duration: '3 Year Program', type: 'UGC & AICTE Recognized', description: 'Online BBA with specializations in Finance and Marketing.' },
    { university: 'JGI Jain University', course: 'Master of Business Administration (MBA)', duration: '2 Year Program', type: 'UGC Recognized', description: 'Online MBA with industry-aligned curriculum.' },
    { university: 'IGNOU', course: 'Bachelor of Arts (BA)', duration: '3 Year Program', type: 'UGC Recognized', description: 'Online BA with multiple discipline options.' },
  ]);
  console.log('Degrees seeded');

  await Offer.insertMany([
    { company: 'Kobra Alkaline Water', title: 'Water Purifier Franchise Offer', description: 'Become a Kobra dealer. Earn ₹50,000+ monthly. Low investment, high returns. Training provided.', category: 'Franchise' },
    { company: 'Aurora Solar', title: 'Solar Panel Dealership', description: 'Authorized dealer program for solar panels. Government subsidy available. Great ROI.', category: 'Energy' },
    { company: 'FreshMart', title: 'Grocery Distribution Franchise', description: 'Join FreshMart\'s distribution network. ₹2L investment, ₹40,000 monthly profit. Urban & rural markets.', category: 'FMCG' },
  ]);
  console.log('Offers seeded');

  await Contact.insertMany([
    { region: 'Andhra Pradesh', address: 'Plot No. 12, MG Road, Vijayawada - 520001', phone: ['+91 98765 43210', '+91 87654 32109'], email: 'ap@sbsindia.com', order: 1 },
    { region: 'Telangana', address: '4th Floor, Cyber Tower, Madhapur, Hyderabad - 500081', phone: ['+91 76543 21098', '+91 65432 10987'], email: 'telangana@sbsindia.com', order: 2 },
    { region: 'Odisha', address: 'Unit-9, Bhubaneswar - 751022', phone: ['+91 54321 09876'], email: 'odisha@sbsindia.com', order: 3 },
  ]);
  console.log('Contacts seeded');

  await Settings.insertMany([
    { key: 'cities', value: ['Vizag', 'Eluru', 'Khammam', 'Hyderabad', 'Vijayawada', 'Guntur', 'Warangal', 'Nellore', 'Tirupati', 'Bhubaneswar', 'Rajahmundry', 'Kakinada'] },
    { key: 'siteUrl', value: 'http://localhost:5173' },
    { key: 'siteName', value: 'SBS - Sai Business Solutions' },
  ]);
  console.log('Settings seeded');

  console.log('\n✅ Database seeded successfully!');
  console.log('Admin Login: admin@sbs.com / sbs@admin123');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
