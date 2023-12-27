const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "6433",
    host: "localhost",
    port: 6433,
    database: "postgres",
});

module.exports = pool;