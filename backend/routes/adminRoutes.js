const router = require('express').Router();
const ctrl = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

router.post('/login', ctrl.login);
router.get('/dashboard/stats', auth, ctrl.getDashboardStats);

module.exports = router;
