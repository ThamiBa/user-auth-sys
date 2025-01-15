import User from "../models/user.model.js"; // Import User model
import bcryptjs from "bcryptjs"; // Import bcrypt
import jwt from "jsonwebtoken"; // Import jsonwebtoken

export const signup = async (req, res) => { // Export signup function
    const {email, password, name} = req.body; // Destructure email, password, name from request body

    try {
        if(!email || !password || !name) { // If email, password, name is missing
            throw new Error("All fields are required"); // Throw error
        }

        const userAlreadyExists = await User.findOne({email}); // Find user with email
        if(userAlreadyExists) { // If user already exists
            return res.status(400).json({ // Send response
                successs:false, message: "User already exists"
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10); // Hash password
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generate verification token

        const user = new User({ // Create new user
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 *60 * 60 * 1000, // 24 hours
        })

        await user.save(); // Save user to database

        // jwt
        generateTokenAndSetCookie(res, user._id); // Generate token and set cookie

        res.status(201).json({ // Send response
            success: true,
            message: "User created successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        });

    } catch (error) {
        res.status(500).json({success: false, message: error.message}); // Send response
    }
};

export const login = async (req, res) => { // Export login function
    res.send("LogIn route!"); // Send response
};

export const logout = async (req, res) => { // Export logout function
    res.send("LogOut route!"); // Send response
};