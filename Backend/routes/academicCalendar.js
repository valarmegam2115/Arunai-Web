const express = require('express');
const router = express.Router();
const academicCalendarController = require('../controllers/academicCalendarController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', academicCalendarController.getAllAcademicCalendars);
router.post('/', verifyToken, academicCalendarController.createAcademicCalendar);
router.put('/:id', verifyToken, academicCalendarController.updateAcademicCalendar);
router.delete('/:id', verifyToken, academicCalendarController.deleteAcademicCalendar);

module.exports = router;
