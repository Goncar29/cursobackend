const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize')

class UserService {

	constructor() {
	}
	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);
		const newUser = await models.User.create({
			...data,
			password: hash
		});
		delete newUser.dataValues.password;
		return newUser;
	}

	async find() {
		const result = await models.User.findAll({
			include: ['Customer']
		});
		return result;
	}

	async findByEmail(email) {
		const result = await models.User.findOne({
			where: { email }
		});
		return result;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id); //busca por la primary key
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	async update(id, changes) {
		const user = await this.findOne(id) // reutilizamos codigo
		const result = await user.update(changes);
		return result;
	}

	async delete(id) {
		const user = await this.findOne(id) // reutilizamos codigo
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
