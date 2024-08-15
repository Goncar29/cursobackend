const { config } = require('../config/config');

module.exports = {
	development: {
		url: config.dbUrl,
		dialect: config.dbEngine,
	},
	production: {
		url: config.dbUrl,
		dialect: config.dbEngine,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			}
		}
	}
}
