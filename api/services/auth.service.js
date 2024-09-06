const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

	async getUser(email, password) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw boom.unauthorized();
		}
		delete user.dataValues.password
		return user;
	}

	signToken(user) {
		const payload = {
			sub: user.id,
			role: user.role
		}
		const token = jwt.sign(payload, config.jwtSecret);
		return {
			user,
			token
		};
	};

	async sendRecovery(email) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		};
		const payload = { sub: user.id };
		const token = jwt.sign(payload, config.jwtSecret, {expiresIn: `15min`});
		const link = `http://myfrontend.com/recovery?token=${token}`;
		await service.update(user.id, {recoveryToken: token})
		const mail = {
			from: config.mailUser, // sender address
			to: `${user.email}`, // list of receivers
			subject: "Email para recuperar contraseña", // Subject line
			// text: "Hello world?", // plain text body
			html: `<b>Ingresa a este link => ${link}</b>`, // html body
		}
		const result = await this.sendMail(mail)
		return result;
	};

	async sendMail(infoMail) {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true, // Use `true` for port 465, `false` for all other ports
			auth: {
				user: config.mailUser,
				pass: config.mailPassword
			}
		});
		await transporter.sendMail(infoMail);
		return { message: 'mail sent' };
	};
}

module.exports = AuthService;



