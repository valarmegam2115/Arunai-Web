const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// Get all departments (for admin dropdown & listing)
exports.getAll = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM departments ORDER BY dept_name ASC');
        // Parse JSON fields
        const parsed = rows.map(row => ({
            ...row,
            courses: JSON.parse(row.courses || '[]'),
            mission: JSON.parse(row.mission || '[]'),
            highlights: JSON.parse(row.highlights || '[]'),
            curriculum: JSON.parse(row.curriculum || '[]'),
            peo_pso_po: JSON.parse(row.peo_pso_po || '[]'),
            faculty: JSON.parse(row.faculty || '[]'),
            infrastructure: JSON.parse(row.infrastructure || '[]'),
            advisory: JSON.parse(row.advisory || '[]'),
            activities: JSON.parse(row.activities || '[]'),
            achievements: JSON.parse(row.achievements || '[]'),
            placements: JSON.parse(row.placements || '[]'),
            alumni: JSON.parse(row.alumni || '[]'),
        }));
        res.status(200).json({ success: true, data: parsed });
    } catch (err) {
        console.error('Error fetching departments:', err);
        res.status(500).json({ success: false, message: 'Server error fetching departments' });
    }
};

// Get single department by slug (for frontend page)
exports.getBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM departments WHERE dept_slug = $1', [slug]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }
        const row = rows[0];
        const parsed = {
            ...row,
            courses: JSON.parse(row.courses || '[]'),
            mission: JSON.parse(row.mission || '[]'),
            highlights: JSON.parse(row.highlights || '[]'),
            curriculum: JSON.parse(row.curriculum || '[]'),
            peo_pso_po: JSON.parse(row.peo_pso_po || '[]'),
            faculty: JSON.parse(row.faculty || '[]'),
            infrastructure: JSON.parse(row.infrastructure || '[]'),
            advisory: JSON.parse(row.advisory || '[]'),
            activities: JSON.parse(row.activities || '[]'),
            achievements: JSON.parse(row.achievements || '[]'),
            placements: JSON.parse(row.placements || '[]'),
            alumni: JSON.parse(row.alumni || '[]'),
        };
        res.status(200).json({ success: true, data: parsed });
    } catch (err) {
        console.error('Error fetching department:', err);
        res.status(500).json({ success: false, message: 'Server error fetching department' });
    }
};

exports.create = async (req, res) => {
    const { 
        dept_slug, dept_name, banner_image, courses, introduction, vision, mission, highlights, 
        curriculum, peo_pso_po, faculty, infrastructure, advisory, activities, achievements, placements, alumni 
    } = req.body;

    if (!dept_slug || !dept_name) {
        return res.status(400).json({ success: false, message: 'Department slug and name are required' });
    }

    try {
        const query = `
            INSERT INTO departments (
                dept_slug, dept_name, banner_image, courses, introduction, vision, mission, highlights, 
                curriculum, peo_pso_po, faculty, infrastructure, advisory, activities, achievements, placements, alumni
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING *
        `;
        const { rows } = await db.query(query, [
            dept_slug,
            dept_name,
            banner_image || '',
            JSON.stringify(courses || []),
            introduction || '',
            vision || '',
            JSON.stringify(mission || []),
            JSON.stringify(highlights || []),
            JSON.stringify(curriculum || []),
            JSON.stringify(peo_pso_po || []),
            JSON.stringify(faculty || []),
            JSON.stringify(infrastructure || []),
            JSON.stringify(advisory || []),
            JSON.stringify(activities || []),
            JSON.stringify(achievements || []),
            JSON.stringify(placements || []),
            JSON.stringify(alumni || []),
        ]);
        const row = rows[0];
        res.status(201).json({
            success: true,
            data: {
                ...row,
                courses: JSON.parse(row.courses || '[]'),
                mission: JSON.parse(row.mission || '[]'),
                highlights: JSON.parse(row.highlights || '[]'),
                curriculum: JSON.parse(row.curriculum || '[]'),
                peo_pso_po: JSON.parse(row.peo_pso_po || '[]'),
                faculty: JSON.parse(row.faculty || '[]'),
                infrastructure: JSON.parse(row.infrastructure || '[]'),
                advisory: JSON.parse(row.advisory || '[]'),
                activities: JSON.parse(row.activities || '[]'),
                achievements: JSON.parse(row.achievements || '[]'),
                placements: JSON.parse(row.placements || '[]'),
                alumni: JSON.parse(row.alumni || '[]'),
            }
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ success: false, message: 'A department with this slug already exists' });
        }
        console.error('Error creating department:', err);
        res.status(500).json({ success: false, message: 'Server error creating department' });
    }
};

// Update a department
exports.update = async (req, res) => {
    const { id } = req.params;
    const { 
        dept_slug, dept_name, banner_image, courses, introduction, vision, mission, highlights, 
        curriculum, peo_pso_po, faculty, infrastructure, advisory, activities, achievements, placements, alumni 
    } = req.body;

    if (!dept_slug || !dept_name) {
        return res.status(400).json({ success: false, message: 'Department slug and name are required' });
    }

    try {
        const query = `
            UPDATE departments 
            SET dept_slug = $1, dept_name = $2, banner_image = $3, courses = $4, 
                introduction = $5, vision = $6, mission = $7, highlights = $8, curriculum = $9,
                peo_pso_po = $10, faculty = $11, infrastructure = $12, advisory = $13,
                activities = $14, achievements = $15, placements = $16, alumni = $17,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $18
            RETURNING *
        `;
        const { rows } = await db.query(query, [
            dept_slug,
            dept_name,
            banner_image || '',
            JSON.stringify(courses || []),
            introduction || '',
            vision || '',
            JSON.stringify(mission || []),
            JSON.stringify(highlights || []),
            JSON.stringify(curriculum || []),
            JSON.stringify(peo_pso_po || []),
            JSON.stringify(faculty || []),
            JSON.stringify(infrastructure || []),
            JSON.stringify(advisory || []),
            JSON.stringify(activities || []),
            JSON.stringify(achievements || []),
            JSON.stringify(placements || []),
            JSON.stringify(alumni || []),
            id,
        ]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }
        const row = rows[0];
        res.status(200).json({
            success: true,
            data: {
                ...row,
                courses: JSON.parse(row.courses || '[]'),
                mission: JSON.parse(row.mission || '[]'),
                highlights: JSON.parse(row.highlights || '[]'),
                curriculum: JSON.parse(row.curriculum || '[]'),
                peo_pso_po: JSON.parse(row.peo_pso_po || '[]'),
                faculty: JSON.parse(row.faculty || '[]'),
                infrastructure: JSON.parse(row.infrastructure || '[]'),
                advisory: JSON.parse(row.advisory || '[]'),
                activities: JSON.parse(row.activities || '[]'),
                achievements: JSON.parse(row.achievements || '[]'),
                placements: JSON.parse(row.placements || '[]'),
                alumni: JSON.parse(row.alumni || '[]'),
            }
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ success: false, message: 'A department with this slug already exists' });
        }
        console.error('Error updating department:', err);
        res.status(500).json({ success: false, message: 'Server error updating department' });
    }
};

// Delete a department
exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('DELETE FROM departments WHERE id = $1 RETURNING *', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }

        // Delete banner image if it was uploaded
        const deletedItem = rows[0];
        if (deletedItem.banner_image && deletedItem.banner_image.includes('/uploads/')) {
            try {
                const urlParts = deletedItem.banner_image.split('/');
                const filename = urlParts[urlParts.length - 1];
                const filePath = path.join(__dirname, '..', 'uploads', filename);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted banner image: ${filePath}`);
                }
            } catch (fileErr) {
                console.error('Error deleting banner file:', fileErr);
            }
        }

        res.status(200).json({ success: true, message: 'Department deleted successfully' });
    } catch (err) {
        console.error('Error deleting department:', err);
        res.status(500).json({ success: false, message: 'Server error deleting department' });
    }
};
