import express from 'express'; // Import express

import { signup, login, logout } from '../controllers/auth.controller.js'; // Import signup, login, logout functions

const router = express.Router();	// Create router

router.get("/signup", signup); // Create route for GET request

router.get("/login", login); // Create route for GET request

router.get("/logout", logout); // Create route for GET request

export default router;	// Export router