require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'dev',
	port: process.env.PORT || 4000,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
	dbUri: process.env.DATABASE_URL,
	isProd: process.env.NODE_ENV === 'production',
	dbEngine: process.env.DB_ENGINE, // postgres
	dbUrl: process.env.POSTGRES_URL,
	apiKey: process.env.API_KEY,
	jwtSecret: process.env.JWT_SECRET,
	mailUser: process.env.MAIL_USER,
	mailPassword: process.env.MAIL_PASS
}

module.exports = { config };
