const router = require('express').Router();
const ctrl = require('../controllers/qrController');
const auth = require('../middleware/authMiddleware');

router.post('/generate', auth, ctrl.generateQR);

module.exports = router;
