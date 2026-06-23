const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', departmentController.getAll);
router.get('/:slug', departmentController.getBySlug);

// Protected routes (admin only)
router.post('/', verifyToken, departmentController.create);
router.put('/:id', verifyToken, departmentController.update);
router.delete('/:id', verifyToken, departmentController.delete);

module.exports = router;
