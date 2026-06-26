const db = require('../config/db');

// Get all recruiters
exports.getAllRecruiters = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM recruiters ORDER BY id ASC');
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add a recruiter
exports.addRecruiter = async (req, res) => {
    try {
        const { company_name, logo_url } = req.body;
        const { rows } = await db.query(
            'INSERT INTO recruiters (company_name, logo_url) VALUES ($1, $2) RETURNING *',
            [company_name, logo_url]
        );
        res.json({ success: true, data: rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update a recruiter
exports.updateRecruiter = async (req, res) => {
    try {
        const { id } = req.params;
        const { company_name, logo_url } = req.body;
        const { rows } = await db.query(
            'UPDATE recruiters SET company_name = $1, logo_url = $2 WHERE id = $3 RETURNING *',
            [company_name, logo_url, id]
        );
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Recruiter not found' });
        res.json({ success: true, data: rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a recruiter
exports.deleteRecruiter = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await db.query('DELETE FROM recruiters WHERE id = $1', [id]);
        if (rowCount === 0) return res.status(404).json({ success: false, message: 'Recruiter not found' });
        res.json({ success: true, message: 'Recruiter deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
