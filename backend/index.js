import express from 'express'; // Import express
import dotenv from 'dotenv'; // Import dotenv
import cors from 'cors'; // Import cors
import cookieParser from 'cookie-parser'; // Import cookie-parser
import path from 'path'; // Import path

import { connectDB } from './db/connectDB.js'; // Import connectDB function
import authRoutes from './routes/auth.route.js'; // Import authRoutes


dotenv.config(); // Load environment variables

const app = express(); // Create express app
const PORT = process.env.PORT || 5000; // Set PORT
const __dirname = path.resolve(); // Set __dirname
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // Allow requests from CLIENT_URL

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

// Routes
app.use("/api/auth", authRoutes); // Use authRoutes for /api/auth route

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist'))); // Serve static files
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')); // Send index.html file for all other routes
    });
}

// Start server
app.listen(PORT, () => {
    connectDB(); // Connect to MongoDB
    console.log("Server is running on port: ", PORT); // Log message
});