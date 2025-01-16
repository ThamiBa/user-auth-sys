import express from 'express'; // Import express
import dotenv from 'dotenv'; // Import dotenv

import { connectDB } from './db/connectDB.js'; // Import connectDB function
import authRoutes from './routes/auth.route.js'; // Import authRoutes

dotenv.config(); // Load environment variables

const app = express(); // Create express app
const PORT = process.env.PORT || 5000; // Set PORT

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Use authRoutes for /api/auth route

// Start server
app.listen(PORT, () => {
    connectDB(); // Connect to MongoDB
    console.log("Server is running on port: ", PORT); // Log message
});