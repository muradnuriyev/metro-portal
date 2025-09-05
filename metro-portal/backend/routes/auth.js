const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const JWT_SECRET = "super_secret_key";

router.post('/login', async (req, res) => {
    const { personal_number, password } = req.body;
    if (!personal_number || !password) return res.status(400).json({ message: "Введите номер и пароль" });

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE personal_number = ?", [personal_number]);
        if (!rows.length) return res.status(401).json({ message: "Неверный номер или пароль" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Неверный номер или пароль" });

        const token = jwt.sign({ id: user.id, personal_number: user.personal_number, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;
