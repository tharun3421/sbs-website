const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Ensure the uploads folder exists (resume/file uploads write here).
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/degrees', require('./routes/degreeRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/qr', require('./routes/qrRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'SBS API running' }));

// Global error handler — must be AFTER all routes
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