const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllDocuments = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM documents ORDER BY category DESC, created_at DESC');
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error('Error fetching documents:', err);
        res.status(500).json({ success: false, message: 'Server error fetching documents' });
    }
};

exports.createDocument = async (req, res) => {
    const { category, title, file_url } = req.body;
    
    if (!category || !title || !file_url) {
        return res.status(400).json({ success: false, message: 'Category, title, and file URL are required' });
    }

    try {
        const query = `
            INSERT INTO documents (category, title, file_url)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const { rows } = await db.query(query, [category, title, file_url]);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error creating document:', err);
        res.status(500).json({ success: false, message: 'Server error creating document' });
    }
};

exports.updateDocument = async (req, res) => {
    const { id } = req.params;
    const { category, title, file_url } = req.body;

    if (!category || !title || !file_url) {
        return res.status(400).json({ success: false, message: 'Category, title, and file URL are required' });
    }

    try {
        const query = `
            UPDATE documents 
            SET category = $1, title = $2, file_url = $3
            WHERE id = $4
            RETURNING *
        `;
        const { rows } = await db.query(query, [category, title, file_url, id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        console.error('Error updating document:', err);
        res.status(500).json({ success: false, message: 'Server error updating document' });
    }
};

exports.deleteDocument = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM documents WHERE id = $1 RETURNING *', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        // Delete the PDF file from the uploads folder
        const deletedDoc = rows[0];
        if (deletedDoc.file_url && deletedDoc.file_url !== '#') {
            try {
                const urlParts = deletedDoc.file_url.split('/');
                const filename = urlParts[urlParts.length - 1];
                const filePath = path.join(__dirname, '..', 'uploads', filename);
                
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted PDF file: ${filePath}`);
                }
            } catch (fileErr) {
                console.error('Error deleting PDF file:', fileErr);
            }
        }

        res.status(200).json({ success: true, message: 'Document and associated file deleted' });
    } catch (err) {
        console.error('Error deleting document:', err);
        res.status(500).json({ success: false, message: 'Server error deleting document' });
    }
};
