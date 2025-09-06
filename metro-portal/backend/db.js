const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",   // имя контейнера MySQL
  user: "root",
  password: "root123",        //  пароль
  database: "metro_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
