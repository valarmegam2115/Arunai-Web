const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllEvents = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM our_events ORDER BY id ASC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error('Error fetching our events:', err);
        res.status(500).json({ success: false, message: 'Server error fetching events' });
    }
};

exports.createEvent = async (req, res) => {
    const { title, date, image, description } = req.body;
    
    if (!title || !date || !image || !description) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO our_events (title, date, image, description)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, date, image, description]);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ success: false, message: 'Server error creating event' });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, image, description } = req.body;

    if (!title || !date || !image || !description) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const query = `
            UPDATE our_events 
            SET title = $1, date = $2, image = $3, description = $4
            WHERE id = $5
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, date, image, description, id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ success: false, message: 'Server error updating event' });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM our_events WHERE id = $1 RETURNING *', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Delete the image file from the uploads folder
        const deletedEvent = rows[0];
        if (deletedEvent.image) {
            try {
                // The image URL is something like http://localhost:5000/uploads/filename.jpg
                // We need to extract the filename and delete it from the Backend/uploads directory
                const urlParts = deletedEvent.image.split('/');
                const filename = urlParts[urlParts.length - 1];
                const filePath = path.join(__dirname, '..', 'uploads', filename);
                
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted file: ${filePath}`);
                }
            } catch (fileErr) {
                console.error('Error deleting image file:', fileErr);
                // We don't return an error response here because the database record is already deleted
            }
        }

        res.status(200).json({ success: true, message: 'Event and associated image deleted' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ success: false, message: 'Server error deleting event' });
    }
};
