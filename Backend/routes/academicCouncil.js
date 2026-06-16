const express = require('express');
const router = express.Router();
const controller = require('../controllers/academicCouncilController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Members
router.get('/members', controller.getAllMembers);
router.post('/members', verifyToken, controller.createMember);
router.put('/members/:id', verifyToken, controller.updateMember);
router.delete('/members/:id', verifyToken, controller.deleteMember);

// Meetings
router.get('/meetings', controller.getAllMeetings);
router.post('/meetings', verifyToken, controller.createMeeting);
router.put('/meetings/:id', verifyToken, controller.updateMeeting);
router.delete('/meetings/:id', verifyToken, controller.deleteMeeting);

module.exports = router;
