const router = require('express').Router();
const ctrl = require('../controllers/applicationController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const handleResumeUpload = (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

router.post('/apply', handleResumeUpload, ctrl.apply);
router.post('/enquire', ctrl.enquire);
router.get('/', auth, ctrl.getAll);
router.put('/:id/status', auth, ctrl.updateStatus);
router.get('/export-csv', auth, ctrl.exportCSV);
router.delete('/:id', auth, ctrl.deleteApplication);

module.exports = router;