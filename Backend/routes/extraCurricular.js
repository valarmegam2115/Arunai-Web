const express = require('express');
const router = express.Router();
const extraCurricularController = require('../controllers/extraCurricularController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Public route
router.get('/', extraCurricularController.getAllActivities);

// Protected admin routes
router.post('/', verifyToken, extraCurricularController.createActivity);
router.put('/:id', verifyToken, extraCurricularController.updateActivity);
router.delete('/:id', verifyToken, extraCurricularController.deleteActivity);

module.exports = router;
