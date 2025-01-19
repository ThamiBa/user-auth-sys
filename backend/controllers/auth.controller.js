import bcryptjs from "bcryptjs";  // Import bcryptjs for password hashing
import crypto from "crypto";  // Import crypto for generating random tokens

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; // Import the generateTokenAndSetCookie utility function for JWT token generation and cookie setting
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js"; // Import the sendVerificationEmail and sendWelcomeEmail functions for sending emails
import { User } from "../models/user.model.js";   // Import the User model from the user.model.js file


export const signup = async (req, res) => { // Signup function: Handles user registration
    const { email, password, name } = req.body; // Destructure email, password, and name from the request body

    try {
        if (!email || !password || !name) { // Check if all required fields (email, password, name) are provided
            throw new Error("All fields are required"); // Throw an error if any field is missing
        }

        const userAlreadyExists = await User.findOne({ email }); // Check if a user with the same email already exists in the database
        if (userAlreadyExists) { // If a user with the same email exists, return a 400 error with a message
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10); // Hash the provided password with a salt of 10 rounds
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit verification token

        const user = new User({ // Create a new user object with the provided data
            email,
            password: hashedPassword, // Store the hashed password
            name,
            verificationToken, // Store the verification token
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Set token expiration to 24 hours from now
        });

        await user.save();         // Save the new user to the database
        generateTokenAndSetCookie(res, user._id);      // Generate a JWT token and set it as an HTTP-only cookie
        await sendVerificationEmail(user.email, verificationToken); // Send the verification email to the user

        res.status(201).json({ // Respond with a 201 status and a success message
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc, // Spread the user document
                password: undefined, // Exclude the password from the response
            },
        });
    } catch (error) { // If an error occurs, respond with a 400 status and the error message
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => { // Verify email function: Handles email verification
    const {code} = req.body; // Destructure the verification code from the request body
    try {
        const user = await User.findOne({ // Find a user with the provided verification token and a valid expiration time
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) { // If the user does not exist or the token is expired, return a 400 error with a message
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true; // Set the user's isVerified field to true
        user.verificationToken = undefined; // Clear the verification token
        user.verificationTokenExpiresAt = undefined; // Clear the expiration time
        await user.save(); // Save the updated user to the database

        await sendWelcomeEmail(user.email, user.name); // Send the welcome email to the user

        res.status(200).json({ // Respond with a 200 status and a success message
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) { // If an error occurs, respond with a 400 status and the error message
        console.log("error in verifyEmail ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => { // Login function: Handles user login (currently a placeholder)
    const { email, password } = req.body; // Destructure email and password from the request body
    try{
        const user = await User.findOne({ email }); // Find a user with the provided email
        if (!user) { // If the user does not exist, return a 400 error with a message
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password); // Compare the provided password with the hashed password
        if (!isPasswordValid) { // If the password is invalid, return a 400 error with a message
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, user._id); // Generate a JWT token and set it as an HTTP-only cookie

        user.lastLogin = Date.now(); // Update the last login date of the user
        await user.save(); // Save the updated user to the database

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        }); // Respond with a success message and the user data (excluding the password)

    } catch (error) {
        console.log("error in login ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => { // Logout function: Handles user logout
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });    // Respond with a success message
};

export const forgotPassword = async (req, res) => {  // Forgot password function: Handles password reset
    const { email } = req.body; // Destructure email from the request body
    try {
        const user = await User.findOne({ email }); // Find a user with the provided email

        if (!user) { // If the user does not exist, return a 400 error with a message
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex"); // Generate a random reset token
        const resetExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Set the expiration time to 1 hours from now

        user.resetPasswordToken = resetToken; // Store the reset token in the user document
        user.resetPasswordExpiresAt = resetExpiresAt; // Store the expiration time in the user document

        await user.save(); // Save the updated user to the database

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`); // Send the password reset email to the user
        
        res.status(200).json({ success: true, message: "Password reset email sent successfully" }); // Respond with a success message
    } catch (error) {
        console.log("error in forgotPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => { // Reset password function: Handles password reset
    const { token } = req.params; // Destructure the reset token from the request parameters
    const { password } = req.body; // Destructure the new password from the request body

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        }); // Find a user with the provided reset token and a valid expiration time

        if (!user) { // If the user does not exist or the token is expired, return a 400 error with a message
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10); // Hash the new password

        user.password = hashedPassword; // Update the user's password with the new hashed password
        user.resetPasswordToken = undefined; // Clear the reset token
        user.resetPasswordExpiresAt = undefined; // Clear the expiration time

        await user.save(); // Save the updated user to the database
        await sendResetSuccessEmail(user.email); // Send the password changed email to the

        res.status(200).json({ success: true, message: "Password reset successfully" }); // Respond with a success message
    } catch (error) {
        console.log("error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req, res) => { // Check auth function: Handles user authentication
	try {
		const user = await User.findById(req.userId).select("-password"); // Find the user by ID and exclude the password field
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" }); // If the user is not found, return a 400 error
		}

		res.status(200).json({ success: true, user }); // Respond with a success message and the user data
	} catch (error) { // If an error occurs, respond with a 400 status and the
		console.log("Error in checkAuth ", error); // Log the error message
		res.status(400).json({ success: false, message: error.message }); // Respond with an error message
	}
}; 