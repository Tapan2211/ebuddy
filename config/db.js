require('dotenv').config(); // Load environment variables FIRST

const mysql = require('mysql2/promise');


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Connected to MySQL Database!');
        connection.release();
    } catch (err) {
        console.error('❌ Database connection failed:', err);
    }
})();

module.exports = db;
