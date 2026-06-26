const express = require('express');
const router = express.Router();
const coeCircularController = require('../controllers/coeCircularController');

router.get('/', coeCircularController.getAllCirculars);
router.post('/', coeCircularController.createCircular);
router.put('/:id', coeCircularController.updateCircular);
router.delete('/:id', coeCircularController.deleteCircular);

module.exports = router;
