const { Strategy } = require('passport-local')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user.service');
const service = new UserService();

const LocalStrategy = new Strategy({
	usernameField: 'email',
	passwordField: 'password',
	},
	async (email, password, done) => {
		try {
			const user = await service.findByEmail(email);
			if (!user) {
				done(boom.unauthorized("The provided email address is not associated with any account."), false);
			}
			const isMatch = await bcrypt.compare(password, user.password);
			console.log(isMatch);

			if (!isMatch) {
				done(boom.unauthorized("The provided password is incorrect. Please try again."), false);
			}
			delete user.dataValues.password;
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = LocalStrategy;


