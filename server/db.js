const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'vansh2k25.database.windows.net',
    user: 'vinay',
    password: 'Megha@1705',
    database: 'event_registration',
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0
});

module.exports = pool;