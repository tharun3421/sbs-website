const router = require('express').Router();
const ctrl = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', ctrl.getJobs);
router.get('/all', auth, ctrl.getAllJobs);
router.post('/', auth, upload.single('logo'), ctrl.createJob);
router.put('/:id', auth, upload.single('logo'), ctrl.updateJob);
router.delete('/:id', auth, ctrl.deleteJob);

module.exports = router;
