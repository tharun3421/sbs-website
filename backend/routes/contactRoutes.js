const router = require('express').Router();
const ctrl = require('../controllers/contactController');
const auth = require('../middleware/authMiddleware');

router.get('/', ctrl.getContacts);
router.put('/:id', auth, ctrl.updateContact);

module.exports = router;
