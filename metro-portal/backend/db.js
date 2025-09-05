const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "metro",
    password: "metro123",
    database: "metro_portal",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
