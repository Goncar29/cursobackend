const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductService {
	constructor() {
		this.products = [];
		// Vamos a decir que corra una instancia del servicio, va a empezar y generar los productos:
		this.generate();
	}
	// será el metodo para generar con la datafake
	generate() {
		const limit = 100;
		for (let i = 0; i < limit; i++) {
			this.products.push({
				id: faker.string.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.url(),
				isBlock: faker.datatype.boolean(),
			});
		}
	}

	async create(data) {
		const newProduct = await models.Product.create(data);
		return newProduct;
	}

	async find() {
		const products = await models.Product.findAll({
			include: ['category'],
		});
		return products;
	}

	async findOne(id) {
		const product = this.products.find((item) => item.id === id);
		if (!product) {
			throw boom.notFound('Product not found');
		}
		if (product.isBlock) {
			throw boom.conflict('Product is block');
		}
		return product;
	}

	async update(id, changes) {
		const index = this.products.findIndex((item) => item.id === id);
		if (index === -1) {
			throw boom.notFound('Product not found');
		}
		const product = this.products[index];
		this.products[index] = {
			...product,
			...changes,
		};
		return this.products[index];
	}

	async delete(id) {
		const index = this.products.findIndex((item) => item.id === id);
		if (index === -1) {
			throw boom.notFound('Product not found');
		}
		this.products.splice(index, 1);
		return { id };
	}
}

module.exports = ProductService;
