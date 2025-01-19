// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the user schema using mongoose.Schema
const userSchema = new mongoose.Schema({
    // Email field: Required, unique, and of type String
    email: {
        type: String,
        required: true, // Email is required
        unique: true,   // Email must be unique
    },
    // Password field: Required and of type String
    password: {
        type: String,
        required: true, // Password is required
    },
    // Name field: Required and of type String
    name: {
        type: String,
        required: true, // Name is required
    },
    // Last login field: Tracks the last login time
    lastLogin: {
        type: Date,
        default: Date.now, // Default value is the current date and time
    },
    // isVerified field: Tracks whether the user's email is verified
    isVerified: {
        type: Boolean,
        default: false, // Default value is false (not verified)
    },
    // resetPasswordToken field: Stores the token for password reset
    resetPasswordToken: String,
    // resetPasswordExpiresAt field: Stores the expiration time for the password reset token
    resetPasswordExpiresAt: Date,
    // verificationToken field: Stores the token for email verification
    verificationToken: String,
    // verificationTokenExpiresAt field: Stores the expiration time for the email verification token
    verificationTokenExpiresAt: Date,
}, { timestamps: true }); // Enable timestamps (createdAt and updatedAt fields)

// Create and export the User model using the userSchema
export const User = mongoose.model("User", userSchema); // Named export