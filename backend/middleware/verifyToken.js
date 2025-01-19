import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => { // Verify token function: Middleware to verify the token
    const token = req.cookies.token; // Get the token from the cookies
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized- no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Set the user in the request object
        next(); // Call the next middleware
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}