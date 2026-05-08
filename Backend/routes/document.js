const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', documentController.getAllDocuments);
router.post('/', verifyToken, documentController.createDocument);
router.put('/:id', verifyToken, documentController.updateDocument);
router.delete('/:id', verifyToken, documentController.deleteDocument);

module.exports = router;
