import express from 'express';	// Import express
import dotenv from 'dotenv';	// Import dotenv

import { connectDB } from './db/connectDB.js'; // Import connectDB function

dotenv.config();	// Load environment variables

const app = express();	// Create express app

app.get("/", (req, res) => { // Create route for GET request
    res.send("Hello World!"); // Send response
});

app.use("/api/auth", authRoutes); // Use authRoutes for /api/auth route

app.listen(3000, () => {	// Start server
    connectDB(); // Connect to MongoDB
    console.log('Server is running on port 3000'); // Log message
});
