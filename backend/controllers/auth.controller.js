import bcryptjs from "bcryptjs";  // Import bcryptjs for password hashing
import crypto from "crypto";  // Import crypto for generating random tokens

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; // Import the generateTokenAndSetCookie utility function for JWT token generation and cookie setting
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js"; // Import the sendVerificationEmail and sendWelcomeEmail functions for sending emails
import { User } from "../models/user.model.js";   // Import the User model from the user.model.js file


export const signup = async (req, res) => { // Signup function: Handles user registration
    // Destructure email, password, and name from the request body
    const { email, password, name } = req.body;

    try {
        // Check if all required fields (email, password, name) are provided
        if (!email || !password || !name) {
            throw new Error("All fields are required"); // Throw an error if any field is missing
        }

        // Check if a user with the same email already exists in the database
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            // If the user already exists, return a 400 error with a message
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password using bcryptjs with a salt factor of 10
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Generate a 6-digit verification token for email verification
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user instance with the provided data
        const user = new User({
            email,
            password: hashedPassword, // Store the hashed password
            name,
            verificationToken, // Store the verification token
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Set token expiration to 24 hours from now
        });

        await user.save();         // Save the new user to the database

        generateTokenAndSetCookie(res, user._id);      // Generate a JWT token and set it as an HTTP-only cookie

        await sendVerificationEmail(user.email, verificationToken); // Send the verification email to the user

        // Respond with a success message and the user data (excluding the password)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc, // Spread the user document
                password: undefined, // Exclude the password from the response
            },
        });
    } catch (error) {
        // If an error occurs, respond with a 400 status and the error message
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => { // Verify email function: Handles email verification
    const {code} = req.body; // Destructure the verification code from the request body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
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

export const checkAuth = async (req, res) => { // Check auth function: Handles checking the user's authentication status
    try {
        const user = await User.findById(req.userId); // Find a user by the user ID in the request object
        if (!user) { // If the user does not exist, return a 400 error with a message
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user }); // Respond with a success message and the user data
    } catch (error) {
        console.log("error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}