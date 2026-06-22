const router = require('express').Router();
const ctrl = require('../controllers/offerController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', ctrl.getOffers);
router.get('/all', auth, ctrl.getAllOffers);
router.post('/', auth, upload.single('image'), ctrl.createOffer);
router.put('/:id', auth, upload.single('image'), ctrl.updateOffer);
router.delete('/:id', auth, ctrl.deleteOffer);

module.exports = router;
