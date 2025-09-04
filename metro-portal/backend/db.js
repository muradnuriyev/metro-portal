const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'metro_portal',
  password: 'yourpassword',
  port: 5432,
});

module.exports = pool;
