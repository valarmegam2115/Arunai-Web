const express = require('express');
const router = express.Router();

// GET /api/status
router.get('/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is functional.'
    });
});

module.exports = router;
