const db = require('../config/db');

exports.getAllNews = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM campus_news ORDER BY created_at DESC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error('Error fetching campus news:', err);
        res.status(500).json({ success: false, message: 'Server error fetching news' });
    }
};

exports.createNews = async (req, res) => {
    const { category, day, month, year, text } = req.body;
    
    if (!category || !day || !month || !year || !text) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO campus_news (category, day, month, year, text)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const { rows } = await db.query(query, [category, day, month, year, text]);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error creating campus news:', err);
        res.status(500).json({ success: false, message: 'Server error creating news' });
    }
};

exports.updateNews = async (req, res) => {
    const { id } = req.params;
    const { category, day, month, year, text } = req.body;

    if (!category || !day || !month || !year || !text) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const query = `
            UPDATE campus_news 
            SET category = $1, day = $2, month = $3, year = $4, text = $5
            WHERE id = $6
            RETURNING *
        `;
        const { rows } = await db.query(query, [category, day, month, year, text, id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'News item not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error updating campus news:', err);
        res.status(500).json({ success: false, message: 'Server error updating news' });
    }
};

exports.deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM campus_news WHERE id = $1 RETURNING *', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'News item not found' });
        }
        res.status(200).json({ success: true, message: 'News item deleted' });
    } catch (err) {
        console.error('Error deleting campus news:', err);
        res.status(500).json({ success: false, message: 'Server error deleting news' });
    }
};
