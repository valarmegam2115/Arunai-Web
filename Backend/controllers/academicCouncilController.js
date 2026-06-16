const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// ── Members ────────────────────────────────────────────────────────

exports.getAllMembers = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM academic_council_members ORDER BY sno ASC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error('Error fetching academic council members:', err);
        res.status(500).json({ success: false, message: 'Server error fetching members' });
    }
};

exports.createMember = async (req, res) => {
    const { sno, name, designation, category } = req.body;

    if (!name || !designation || !category) {
        return res.status(400).json({ success: false, message: 'Name, designation, and category are required' });
    }

    try {
        const query = `
            INSERT INTO academic_council_members (sno, name, designation, category)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const { rows } = await db.query(query, [sno || 0, name, designation, category]);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error creating member:', err);
        res.status(500).json({ success: false, message: 'Server error creating member' });
    }
};

exports.updateMember = async (req, res) => {
    const { id } = req.params;
    const { sno, name, designation, category } = req.body;

    if (!name || !designation || !category) {
        return res.status(400).json({ success: false, message: 'Name, designation, and category are required' });
    }

    try {
        const query = `
            UPDATE academic_council_members 
            SET sno = $1, name = $2, designation = $3, category = $4
            WHERE id = $5
            RETURNING *
        `;
        const { rows } = await db.query(query, [sno || 0, name, designation, category, id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error updating member:', err);
        res.status(500).json({ success: false, message: 'Server error updating member' });
    }
};

exports.deleteMember = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM academic_council_members WHERE id = $1 RETURNING *', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }
        res.status(200).json({ success: true, message: 'Member deleted' });
    } catch (err) {
        console.error('Error deleting member:', err);
        res.status(500).json({ success: false, message: 'Server error deleting member' });
    }
};

// ── Meetings ───────────────────────────────────────────────────────

exports.getAllMeetings = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM academic_council_meetings ORDER BY display_order ASC, created_at DESC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error('Error fetching academic council meetings:', err);
        res.status(500).json({ success: false, message: 'Server error fetching meetings' });
    }
};

exports.createMeeting = async (req, res) => {
    const { title, file_url, display_order } = req.body;

    if (!title || !file_url) {
        return res.status(400).json({ success: false, message: 'Title and file URL are required' });
    }

    try {
        const query = `
            INSERT INTO academic_council_meetings (title, file_url, display_order)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, file_url, display_order || 0]);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error creating meeting:', err);
        res.status(500).json({ success: false, message: 'Server error creating meeting' });
    }
};

exports.updateMeeting = async (req, res) => {
    const { id } = req.params;
    const { title, file_url, display_order } = req.body;

    if (!title || !file_url) {
        return res.status(400).json({ success: false, message: 'Title and file URL are required' });
    }

    try {
        const query = `
            UPDATE academic_council_meetings 
            SET title = $1, file_url = $2, display_order = $3
            WHERE id = $4
            RETURNING *
        `;
        const { rows } = await db.query(query, [title, file_url, display_order || 0, id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Meeting not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error updating meeting:', err);
        res.status(500).json({ success: false, message: 'Server error updating meeting' });
    }
};

exports.deleteMeeting = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM academic_council_meetings WHERE id = $1 RETURNING *', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Meeting not found' });
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
                    console.log(`Deleted meeting file: ${filePath}`);
                }
            } catch (fileErr) {
                console.error('Error deleting meeting file:', fileErr);
            }
        }

        res.status(200).json({ success: true, message: 'Meeting and associated file deleted' });
    } catch (err) {
        console.error('Error deleting meeting:', err);
        res.status(500).json({ success: false, message: 'Server error deleting meeting' });
    }
};
