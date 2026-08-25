const router = require('express').Router();
const ctrl = require('../controllers/associateController');
const auth = require('../middleware/associateAuthMiddleware');
const loginLimiter = require('../middleware/loginLimiter');

router.post('/register', loginLimiter, ctrl.register);
router.post('/login', loginLimiter, ctrl.login);
router.post('/logout', auth, ctrl.logout);
router.get('/profile', auth, ctrl.getProfile);
router.get('/dashboard/stats', auth, ctrl.getDashboardStats);

module.exports = router;