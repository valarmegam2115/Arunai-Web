const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM code_of_conduct ORDER BY display_order ASC, created_at DESC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error('Error fetching code of conduct entries:', err);
        res.status(500).json({ success: false, message: 'Server error fetching code of conduct entries' });
    }
};

exports.create = async (req, res) => {
    const { title, file_url, display_order } = req.body;

    if (!title || !file_url) {
        return res.status(400).json({ success: false, message: 'Title and file URL are required' });
    }

    try {
        const query = `
            INSERT INTO code_of_conduct (title, file_url, display_order)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, file_url, display_order || 0]);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error creating code of conduct entry:', err);
        res.status(500).json({ success: false, message: 'Server error creating entry' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, file_url, display_order } = req.body;

    if (!title || !file_url) {
        return res.status(400).json({ success: false, message: 'Title and file URL are required' });
    }

    try {
        const query = `
            UPDATE code_of_conduct 
            SET title = $1, file_url = $2, display_order = $3
            WHERE id = $4
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, file_url, display_order || 0, id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Entry not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error updating code of conduct entry:', err);
        res.status(500).json({ success: false, message: 'Server error updating entry' });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM code_of_conduct WHERE id = $1 RETURNING *', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Entry not found' });
        }

        // Delete the PDF file from the uploads folder
        const deletedItem = rows[0];
        if (deletedItem.file_url && deletedItem.file_url !== '#') {
            try {
                const urlParts = deletedItem.file_url.split('/');
                const filename = urlParts[urlParts.length - 1];
                const filePath = path.join(__dirname, '..', 'uploads', filename);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted code of conduct file: ${filePath}`);
                }
            } catch (fileErr) {
                console.error('Error deleting file:', fileErr);
            }
        }

        res.status(200).json({ success: true, message: 'Entry and associated file deleted' });
    } catch (err) {
        console.error('Error deleting code of conduct entry:', err);
        res.status(500).json({ success: false, message: 'Server error deleting entry' });
    }
};
