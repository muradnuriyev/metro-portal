// adminAuth.js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ message: "Недействительный токен" });
    }
}

module.exports = authMiddleware;
