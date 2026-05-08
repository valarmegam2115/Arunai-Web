const express = require('express');
const router = express.Router();
const ourEventsController = require('../controllers/ourEventsController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Public route
router.get('/', ourEventsController.getAllEvents);

// Protected admin routes
router.post('/', verifyToken, ourEventsController.createEvent);
router.put('/:id', verifyToken, ourEventsController.updateEvent);
router.delete('/:id', verifyToken, ourEventsController.deleteEvent);

module.exports = router;
