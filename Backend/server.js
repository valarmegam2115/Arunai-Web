const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const indexRoutes = require('./routes/index');
app.use('/api', indexRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.send('Backend Server is running.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
