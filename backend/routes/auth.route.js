import express from 'express'; // Import express

const router = express.Router();	// Create router

router.get("/SignUp", (req, res) => { // Create route for GET request
    res.send("SignUp route!"); // Send response
});

router.get("/Login", (req, res) => { // Create route for GET request
    res.send("Login route!"); // Send response
});

router.get("/Logout", (req, res) => { // Create route for GET request
    res.send("Logout route!"); // Send response
});

export default router;	// Export router