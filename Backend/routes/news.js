const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Public route to get all news
router.get('/', newsController.getAllNews);

// Protected routes to manage news
router.post('/', verifyToken, newsController.createNews);
router.put('/:id', verifyToken, newsController.updateNews);
router.delete('/:id', verifyToken, newsController.deleteNews);

module.exports = router;
