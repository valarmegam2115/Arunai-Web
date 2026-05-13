const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
const initDb = require('./models/initDb');
initDb();

// Middlewares
app.use(helmet({
    crossOriginResourcePolicy: false, // Allow images to be loaded from this server
}));
app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const indexRoutes = require('./routes/index');
app.use('/api', indexRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.send('Backend Server is running.');
});

// Start server (only if not running as a serverless function)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
