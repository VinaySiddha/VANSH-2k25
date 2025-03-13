const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12767552',
    password: 'PfujIX53NR',
    database: 'event_registration',
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0
});

module.exports = pool;