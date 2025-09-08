const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const token = req.header("x-admin-token");
  if (!token) return res.status(401).json({ msg: "Нет admin-токена" });

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Неверный admin-токен" });
  }
}

module.exports = adminAuth;
