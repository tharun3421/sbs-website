const jwt = require('jsonwebtoken');
const Job = require('../models/Job');
const Degree = require('../models/Degree');
const Offer = require('../models/Offer');
const Application = require('../models/Application');
const LoanCategory = require('../models/LoanCategory');
const OtherService = require('../models/OtherService');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalJobs, totalDegrees, totalOffers, totalApplications, todayApplications, recentApps, totalLoans, totalOtherServices] = await Promise.all([
      Job.countDocuments({ isActive: true }),
      Degree.countDocuments({ isActive: true }),
      Offer.countDocuments({ isActive: true }),
      Application.countDocuments(),
      Application.countDocuments({ createdAt: { $gte: today } }),
      Application.find().sort({ createdAt: -1 }).limit(10),
      LoanCategory.countDocuments({ isActive: true }),
      OtherService.countDocuments({ isActive: true }),
    ]);

    res.json({ totalJobs, totalDegrees, totalOffers, totalApplications, todayApplications, recentApps, totalLoans, totalOtherServices });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};