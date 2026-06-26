const router = require('express').Router();
const ctrl = require('../controllers/otherServiceController');
const auth = require('../middleware/authMiddleware');

router.get('/', ctrl.getServices);
router.get('/all', auth, ctrl.getAllServices);
router.post('/', auth, ctrl.createService);
router.put('/:id', auth, ctrl.updateService);
router.delete('/:id', auth, ctrl.deleteService);

module.exports = router;