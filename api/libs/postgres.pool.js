const { Pool } = require('pg');

const pool = new Pool({
	host: 'localhost',
	port: '5433',
	user: 'root',
	password: 'root',
	database: 'my_store'
});

module.exports = pool;

