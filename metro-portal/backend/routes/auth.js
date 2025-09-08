const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

router.post("/login", async (req, res) => {
  const { personalNumber, password } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [personalNumber]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "İstifadəçi adı və ya şifrə yanlışdır" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "İstifadəçi adı və ya şifrə yanlışdır" });
    }

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Giriş xətası:", err);
    res.status(500).json({ message: "Server xətası" });
  }
});

module.exports = router;
