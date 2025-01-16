import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only works on HTTPS in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
    });

    return token; // Return the generated token
};