// middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "super_secret_key";

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Нет токена" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ message: "Недействительный токен" });
    }
}

module.exports = authMiddleware;
