const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const userRoutes = require('./routes/authRoutes');

// Load config
dotenv.config();
const app = express();
app.use(express.json());

// Connect to database
connectDb();

// Define routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
