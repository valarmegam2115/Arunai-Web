const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllAcademicCalendars = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM academic_calendars ORDER BY display_order ASC, created_at DESC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error('Error fetching academic calendars:', err);
        res.status(500).json({ success: false, message: 'Server error fetching academic calendars' });
    }
};

exports.createAcademicCalendar = async (req, res) => {
    const { title, file_url, display_order } = req.body;
    
    if (!title || !file_url) {
        return res.status(400).json({ success: false, message: 'Title and file URL are required' });
    }

    try {
        const query = `
            INSERT INTO academic_calendars (title, file_url, display_order)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, file_url, display_order || 0]);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error creating academic calendar:', err);
        res.status(500).json({ success: false, message: 'Server error creating academic calendar' });
    }
};

exports.updateAcademicCalendar = async (req, res) => {
    const { id } = req.params;
    const { title, file_url, display_order } = req.body;

    if (!title || !file_url) {
        return res.status(400).json({ success: false, message: 'Title and file URL are required' });
    }

    try {
        const query = `
            UPDATE academic_calendars 
            SET title = $1, file_url = $2, display_order = $3
            WHERE id = $4
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, file_url, display_order || 0, id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Academic calendar not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error updating academic calendar:', err);
        res.status(500).json({ success: false, message: 'Server error updating academic calendar' });
    }
};

exports.deleteAcademicCalendar = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM academic_calendars WHERE id = $1 RETURNING *', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Academic calendar not found' });
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
                    console.log(`Deleted academic calendar file: ${filePath}`);
                }
            } catch (fileErr) {
                console.error('Error deleting academic calendar file:', fileErr);
            }
        }

        res.status(200).json({ success: true, message: 'Academic calendar and associated file deleted' });
    } catch (err) {
        console.error('Error deleting academic calendar:', err);
        res.status(500).json({ success: false, message: 'Server error deleting academic calendar' });
    }
};
