// config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: 'Z', // store & fetch in UTC to avoid timezone mismatch
  waitForConnections: true,
  connectionLimit: 10, // can be increased for production
  queueLimit: 0
});

// Optional: Test connection at startup
(async () => {
  try {
    const conn = await db.getConnection();
    await conn.query("SET time_zone = '+00:00'");
    console.log('✅ MySQL connected successfully');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // Exit if DB not reachable
  }
})();

export default db;
