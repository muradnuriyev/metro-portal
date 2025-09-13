const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // для шифрования паролей
const pool = require("../db"); // подключение к MySQL
const router = express.Router();

// POST /api/admin/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("LOGIN ATTEMPT:", username, password);

    const [rows] = await pool.query("SELECT * FROM admins WHERE username = ?", [username]);
    console.log("DB RESULT:", rows);

    if (rows.length === 0) {
      return res.status(400).json({ msg: "Админ не найден" });
    }

    const admin = rows[0];
    console.log("FOUND ADMIN:", admin);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, fullName: admin.fullname },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("TOKEN CREATED:", token);

    res.json({ adminToken: token, fullName: admin.fullname });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;