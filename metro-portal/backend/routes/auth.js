const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

router.post("/login", async (req, res) => {
  const { personalNumber, password } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE personal_number = ?",
      [personalNumber]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "Неверный номер или дата рождения" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Неверный номер или дата рождения" });
    }

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Ошибка входа:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
