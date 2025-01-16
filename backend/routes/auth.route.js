import express from 'express'; // Import express

import { signup, login, logout } from '../controllers/auth.controller.js'; // Import signup, login, logout functions

const router = express.Router();	// Create router

router.post("/signup", signup); // Create route for GET request

router.post("/login", login); // Create route for GET request

router.post("/logout", logout); // Create route for GET request

export default router;	// Export router