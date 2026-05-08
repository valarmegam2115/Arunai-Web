const express = require('express');
const router = express.Router();

// GET /api/status
router.get('/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is functional.'
    });
});

const authRoutes = require('./auth');
const newsRoutes = require('./news');
const ourEventsRoutes = require('./ourEvents');
const extraCurricularRoutes = require('./extraCurricular');
const documentRoutes = require('./document');

router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/our-events', ourEventsRoutes);
router.use('/extra-curricular', extraCurricularRoutes);
router.use('/documents', documentRoutes);

const uploadRoutes = require('./upload');
router.use('/upload', uploadRoutes);

module.exports = router;
