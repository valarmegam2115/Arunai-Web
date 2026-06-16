const express = require('express');
const router = express.Router();
const controller = require('../controllers/codeOfConductController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', controller.getAll);
router.post('/', verifyToken, controller.create);
router.put('/:id', verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
