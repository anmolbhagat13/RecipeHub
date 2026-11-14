const jwt = require("jsonwebtoken");

// Authentication middleware
const authMiddleware = (req, res, next) => {
    try{
        // Get token from cookies
        const token = req.cookies?.token;

        // Check if token exists
        if(!token) {
            return res.status(401).json({
                message: "Authentication required. Please log in.",
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user ID to request object
        req.userId = decoded.userId;

        // Allow the request to continue
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token. Please log in again.",
        });
    }
};

module.exports = authMiddleware;