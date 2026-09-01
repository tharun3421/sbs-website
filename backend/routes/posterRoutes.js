const router = require('express').Router();
const ctrl = require('../controllers/posterController');
const auth = require('../middleware/authMiddleware');

// Admin-only, put before the public `/:category` route so it isn't
// swallowed by it.
router.get('/upload-signature', auth, ctrl.getUploadSignature);

// Public — active posters only.
router.get('/:category', ctrl.getPosters);

// Admin — every poster in the category, including hidden ones.
router.get('/:category/all', auth, ctrl.getAllPosters);

router.post('/', auth, ctrl.createPoster);
router.put('/:id', auth, ctrl.updatePoster);
router.delete('/:id', auth, ctrl.deletePoster);

module.exports = router;