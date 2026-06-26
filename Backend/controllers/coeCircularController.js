const db = require('../config/db');

exports.getAllCirculars = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM coe_circulars ORDER BY id DESC');
        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Error fetching coe circulars:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.createCircular = async (req, res) => {
    const { category, academic_term, title, file_url } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO coe_circulars (category, academic_term, title, file_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [category || 'Circulars & Notifications', academic_term, title, file_url]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Error creating coe circular:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateCircular = async (req, res) => {
    const { id } = req.params;
    const { category, academic_term, title, file_url } = req.body;
    try {
        const result = await db.query(
            'UPDATE coe_circulars SET category = $1, academic_term = $2, title = $3, file_url = $4 WHERE id = $5 RETURNING *',
            [category || 'Circulars & Notifications', academic_term, title, file_url, id]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Error updating coe circular:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteCircular = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM coe_circulars WHERE id = $1', [id]);
        res.json({ success: true, message: 'Circular deleted' });
    } catch (err) {
        console.error('Error deleting coe circular:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
