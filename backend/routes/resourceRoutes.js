const router = require('express').Router();
const ctrl = require('../controllers/resourceController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', ctrl.getResources);
router.get('/all', auth, ctrl.getAllResources);
router.get('/categories', ctrl.getCategories);
router.post('/', auth, upload.single('file'), ctrl.createResource);
router.put('/:id', auth, upload.single('file'), ctrl.updateResource);
router.delete('/:id', auth, ctrl.deleteResource);

module.exports = router;