const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllActivities = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM extra_curricular ORDER BY id ASC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error('Error fetching extra-curricular activities:', err);
        res.status(500).json({ success: false, message: 'Server error fetching activities' });
    }
};

exports.createActivity = async (req, res) => {
    const { title, description, image, link } = req.body;
    
    if (!title || !description || !image) {
        return res.status(400).json({ success: false, message: 'Title, description, and image are required' });
    }

    try {
        const query = `
            INSERT INTO extra_curricular (title, description, image, link)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, description, image, link || '#']);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error creating activity:', err);
        res.status(500).json({ success: false, message: 'Server error creating activity' });
    }
};

exports.updateActivity = async (req, res) => {
    const { id } = req.params;
    const { title, description, image, link } = req.body;

    if (!title || !description || !image) {
        return res.status(400).json({ success: false, message: 'Title, description, and image are required' });
    }

    try {
        const query = `
            UPDATE extra_curricular 
            SET title = $1, description = $2, image = $3, link = $4
            WHERE id = $5
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, description, image, link || '#', id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Activity not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error updating activity:', err);
        res.status(500).json({ success: false, message: 'Server error updating activity' });
    }
};

exports.deleteActivity = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM extra_curricular WHERE id = $1 RETURNING *', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Activity not found' });
        }

        // Delete the image file from the uploads folder
        const deletedActivity = rows[0];
        if (deletedActivity.image) {
            try {
                // The image URL is something like http://localhost:5000/uploads/filename.jpg
                const urlParts = deletedActivity.image.split('/');
                const filename = urlParts[urlParts.length - 1];
                const filePath = path.join(__dirname, '..', 'uploads', filename);
                
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted file: ${filePath}`);
                }
            } catch (fileErr) {
                console.error('Error deleting image file:', fileErr);
            }
        }

        res.status(200).json({ success: true, message: 'Activity and associated image deleted' });
    } catch (err) {
        console.error('Error deleting activity:', err);
        res.status(500).json({ success: false, message: 'Server error deleting activity' });
    }
};
