import jwt from "jsonwebtoken"; // Import jsonwebtoken

export const generateTokenAndSetCookie = (res, userId) => { // Export generateTokenAndSetCookie function
    const token = jwt.sign({userId}, process.env.JWT_SECRET, 
        {expiresIn: "7d"}); // Generate token

    res.cookie("token", token, { // Set cookie
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only works on https
        sameSite: "strict", // csrf
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return token; // Return token
}