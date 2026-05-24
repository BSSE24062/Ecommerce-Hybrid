const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
});

const connectPG = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log("✅ PostgreSQL Connected");
    } catch (err) {
        console.error("❌ PostgreSQL Connection Failed:", err.message);
    }
};

module.exports = { pool, connectPG };