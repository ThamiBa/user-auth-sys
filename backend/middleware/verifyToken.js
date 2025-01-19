import jwt from "jsonwebtoken"; // Importing jsonwebtoken

export const verifyToken = (req, res, next) => { // Verify token function: Handles token verification
	const token = req.cookies.token;    // Get the token from the request cookies
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" }); // If no token is provided, return a 401 error with a message
	try { // Try to verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using the JWT_SECRET

		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" }); // If the token is invalid, return a 401 error with a message

		req.userId = decoded.userId; // Set the userId in the request object to the decoded userId
		next(); // Call the next middleware
	} catch (error) { // Catch any errors
		console.log("Error in verifyToken ", error); // Log the error
		return res.status(500).json({ success: false, message: "Server error" }); // Return a 500 error with a message
	}
};