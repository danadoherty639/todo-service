const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'tasks',
    password: 'postgres',
    port: 5432,
});

module.exports = pool;

