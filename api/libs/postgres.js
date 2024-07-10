const { Client } = require('pg');

async function getConnection() {
	const client = new Client({
		host: 'localhost',
		port: '5433',
		user: 'root',
		password: 'root',
		database: 'my_store'
	});
	client.connect();
	return client;
}

module.exports = getConnection;

