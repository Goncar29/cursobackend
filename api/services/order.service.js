const { models } = require('./../libs/sequelize')
class OrderService {

	constructor() {
	}
	async create(user) {
		const newOrder = await models.Order.create(
			{
				customerId: user.sub
			}
		);
		return newOrder;
	}

	async addItem(data) {
		const newItem = await models.OrderProduct.create(data);
		return newItem;
	}

	async findByUser(userId) {
		const orders = await models.Order.findAll({
			where: {
				'$customer.user.id$': userId
			},
			include: [
				{
					association: 'customer',
					include: ['user']
				}
			]
		});
		return orders
	}

	async find() {
		const orders = await models.Order.findAll({
			include: [
				{
					association: 'customer',
					include: ['user']
				},
				'items'
			]
		})
		return orders
	}

	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: [{
				association: 'customer',
				include: ['user']
			},
			'items'
			]
		});
		if (!order) {
			throw boom.notFound('Order not found');
		}
		return order;
	}

	async update(id, changes) {
		const order = await this.findOne(id) // reutilizamos codigo
		const result = await order.update(changes);
		return result;
	}

	async delete(id) {
		const order = await this.findOne(id) // reutilizamos codigo
		await order.destroy();
		return { id };
	}
}

module.exports = OrderService;
