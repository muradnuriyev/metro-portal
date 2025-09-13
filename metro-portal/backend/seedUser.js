const bcrypt = require("bcryptjs");
const pool = require("./db"); // <-- здесь импортируем пул

async function addUser(personal_number, password, name) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // используем pool.query
        await pool.query(
            "INSERT INTO admins (username, password) VALUES (?, ?)",
            [personal_number, hashedPassword, name]
        );

        console.log("✅ User added!");
        process.exit(0); // завершить скрипт
    } catch (err) {
        console.error("❌ Error adding user:", err);
        process.exit(1);
    }
}

// Пример
addUser("1234", "27-08-2001", "Murad Nuriyev");
