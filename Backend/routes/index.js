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
const academicCalendarRoutes = require('./academicCalendar');
const academicCouncilRoutes = require('./academicCouncil');
const codeOfConductRoutes = require('./codeOfConduct');
const departmentRoutes = require('./department');

router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/our-events', ourEventsRoutes);
router.use('/extra-curricular', extraCurricularRoutes);
router.use('/documents', documentRoutes);
router.use('/academic-calendars', academicCalendarRoutes);
router.use('/academic-council', academicCouncilRoutes);
router.use('/code-of-conduct', codeOfConductRoutes);
router.use('/departments', departmentRoutes);

const uploadRoutes = require('./upload');
router.use('/upload', uploadRoutes);

module.exports = router;
