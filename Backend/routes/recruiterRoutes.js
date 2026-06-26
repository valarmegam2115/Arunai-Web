const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', recruiterController.getAllRecruiters);
router.post('/', verifyToken, recruiterController.addRecruiter);
router.put('/:id', verifyToken, recruiterController.updateRecruiter);
router.delete('/:id', verifyToken, recruiterController.deleteRecruiter);

module.exports = router;
