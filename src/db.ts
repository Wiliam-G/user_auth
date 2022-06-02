import mysql from 'mysql2';

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '1234',
    database        : 'auth'
});

export default pool;