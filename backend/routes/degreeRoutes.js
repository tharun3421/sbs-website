const router = require('express').Router();
const ctrl = require('../controllers/degreeController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', ctrl.getDegrees);
router.get('/all', auth, ctrl.getAllDegrees);
router.post('/', auth, upload.single('logo'), ctrl.createDegree);
router.put('/:id', auth, upload.single('logo'), ctrl.updateDegree);
router.delete('/:id', auth, ctrl.deleteDegree);

module.exports = router;
