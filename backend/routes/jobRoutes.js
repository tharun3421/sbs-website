const router = require('express').Router();
const ctrl = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const jobUpload = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'reel', maxCount: 1 }]);

router.get('/', ctrl.getJobs);
router.get('/all', auth, ctrl.getAllJobs);
// router.post('/', auth, upload.single('logo'), ctrl.createJob);
// router.put('/:id', auth, upload.single('logo'), ctrl.updateJob);

router.post('/', auth, jobUpload, ctrl.createJob);
router.put('/:id', auth, jobUpload, ctrl.updateJob);

router.delete('/:id', auth, ctrl.deleteJob);

module.exports = router;
