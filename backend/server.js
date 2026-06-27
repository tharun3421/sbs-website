const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://sbs-website-frontend.vercel.app',
    'https://sbs.ind.in',
    'https://www.sbs.ind.in',
  ],
  credentials: true,
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => res.json({ message: 'SBS API is running' }));

// Routes
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/degrees', require('./routes/degreeRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/qr', require('./routes/qrRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/other-services', require('./routes/otherServiceRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'SBS API running' }));

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File is too large. Max size is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    console.error(err);
    return res.status(400).json({ message: err.message || 'Something went wrong. Please try again.' });
  }
  next();
});

// Connect DB and start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });