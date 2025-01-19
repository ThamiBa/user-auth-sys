import express from 'express'; // Import express
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword} from '../controllers/auth.controller.js'; // Import the controller functions

const router = express.Router();	// Create router

router.post("/signup", signup); // Create route for GET request
router.post("/login", login); // Create route for GET request
router.post("/logout", logout); // Create route for GET request

router.post("/verify-email", verifyEmail); // Create route for POST request
router.post("/forgot-password", forgotPassword); // Create route for POST request

router.post("/reset-password/:token", resetPassword); // Create route for POST request

export default router;	// Export router