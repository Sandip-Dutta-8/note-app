import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: true, message: "Token missing or not provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("JWT verification error:", err.message); // Log the error
            return res.status(403).json({ error: true, message: "Invalid or expired token" });
        }

        req.user = user; // Attach user info from token to req.user
        next();
    });
}
