import express from 'express'; // Import express

const router = express.Router();	// Create router

router.get("/", (req, res) => { // Create route for GET request
    res.send("SignUp route!"); // Send response
});

export default router;	// Export router