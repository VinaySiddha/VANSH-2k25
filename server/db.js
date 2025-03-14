const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '148.66.136.53', // Change if your DB is remote
    user: 'sveccollege',
    password: 'Svec@123456',
    database: 'sveccollege',
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0
});

module.exports = pool;