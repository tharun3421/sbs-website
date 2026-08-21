const router = require('express').Router();
const ctrl = require('../controllers/leadController');
const auth = require('../middleware/associateAuthMiddleware');

router.get('/', auth, ctrl.getMyLeads);
router.post('/', auth, ctrl.createLead);
router.delete('/:id', auth, ctrl.deleteMyLead);

module.exports = router;