import express from 'express'; // Import express

const router = express.Router();	// Create router

router.get("/signUp", (req, res) => { // Create route for GET request
    res.send("SignUp route!"); // Send response
});

router.get("/login", (req, res) => { // Create route for GET request
    res.send("Login route!"); // Send response
});

router.get("/logout", (req, res) => { // Create route for GET request
    res.send("Logout route!"); // Send response
});

export default router;	// Export router