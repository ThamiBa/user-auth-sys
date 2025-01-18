import { User } from "../models/user.model.js";   // Import the User model from the user.model.js file
import bcryptjs from "bcryptjs";  // Import bcryptjs for password hashing
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; // Import the generateTokenAndSetCookie utility function for JWT token generation and cookie setting
import { sendVerificationEmail } from "../mailtrap/emails.js"; // Import the sendVerificationEmail function from the emails.js file
import { sendWelcomeEmail } from "../mailtrap/emails.js"; // Import the sendWelcomeEmail function from the emails.js file

// Signup function: Handles user registration
export const signup = async (req, res) => {
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

export const verifyEmail = async (req, res) => {
    // 1 2 3 4 5 6
    const {code} = req.body;
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
    // Placeholder response for the login route
    res.send("LogIn route!");
};

// Logout function: Handles user logout (currently a placeholder)
export const logout = async (req, res) => {
    // Placeholder response for the logout route
    res.send("LogOut route!");
};