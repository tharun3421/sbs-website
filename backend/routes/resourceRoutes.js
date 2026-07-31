const router = require('express').Router();
const ctrl = require('../controllers/resourceController');
const auth = require('../middleware/authMiddleware');

router.get('/', ctrl.getResources);
router.get('/all', auth, ctrl.getAllResources);
router.get('/categories', ctrl.getCategories);
router.get('/upload-signature', auth, ctrl.getUploadSignature);
router.post('/', auth, ctrl.createResource);
router.put('/:id', auth, ctrl.updateResource);
router.delete('/:id', auth, ctrl.deleteResource);

module.exports = router;