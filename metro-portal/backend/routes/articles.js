const express = require('express');
const router = express.Router();
const pool = require('../db');

// Получить все статьи
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM articles");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;
