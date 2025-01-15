import express from 'express';	// Import express
import dotenv from 'dotenv';	// Import dotenv

import { connectDB } from './db/connectDB.js'; // Import connectDB function

import authRoutes from './routes/auth.route.js'; // Import authRoutes

dotenv.config();	// Load environment variables

const app = express();	// Create express app
const PORT = process.env.PORT || 5000;	// Set PORT

// app.get("/", (req, res) => { // Create route for GET request
//     res.send("Hello World!"); // Send response                            // just for testing
// });



app.use("/api/auth", authRoutes); // Use authRoutes for /api/auth route
app.use(express.json());	// allow us to parse incoming requests:req.body in json format

app.listen(PORT, () => {	// Start server
    connectDB(); // Connect to MongoDB
    console.log("Server is running on port: ", PORT); // Log message
});
