const router = require('express').Router();
const ctrl = require('../controllers/loanController');
const auth = require('../middleware/authMiddleware');

router.get('/', ctrl.getLoans);
router.get('/all', auth, ctrl.getAllLoans);
router.post('/', auth, ctrl.createLoan);
router.put('/:id', auth, ctrl.updateLoan);
router.delete('/:id', auth, ctrl.deleteLoan);

module.exports = router;