const router = require('express').Router();
const ctrl = require('../controllers/settingsController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', ctrl.getSettings);
router.put('/', auth, ctrl.updateSettings);

// Partner logos for the infinite scroll on public pages
router.post('/partner-logos', auth, upload.single('logo'), ctrl.addPartnerLogo);
router.delete('/partner-logos/:index', auth, ctrl.removePartnerLogo);

module.exports = router;