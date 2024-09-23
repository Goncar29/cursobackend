const { models } = require('./../libs/sequelize')

class CategoryService {

	constructor() {
	}
	async create(data) {
		const newCategory = await models.Category.create(data)
		return newCategory;
	}

	async find() {
		const categories = await models.Category.findAll()
		return categories;
	}

	async findOne(id) {
		const category = await models.Category.findByPk(id, {
			include: ['products']
		})
		return category;
	}

	async update(id, changes) {
		const category = await this.findOne(id) // reutilizamos codigo
		const result = await category.update(changes);
		return result;
	}
	async delete(id) {
		const category = await this.findOne(id) // reutilizamos codigo
		if (!category) {
			throw boom.notFound('Category not found');
		}
		await category.destroy();
		return { id };
	}
}

module.exports = CategoryService;
