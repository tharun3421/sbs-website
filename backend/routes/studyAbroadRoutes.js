const router = require('express').Router();
const ctrl   = require('../controllers/studyAbroadController');
const auth   = require('../middleware/authMiddleware');

router.get('/',       ctrl.getListings);
router.get('/all',    auth, ctrl.getAllListings);
router.post('/',      auth, ctrl.createListing);
router.put('/:id',    auth, ctrl.updateListing);
router.delete('/:id', auth, ctrl.deleteListing);

module.exports = router;