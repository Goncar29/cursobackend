'use strict';

/** @type {import('sequelize-cli').Migration} */
const { OrderSchema, ORDER_TABLE } = require('../models/order.model');
module.exports = {
	async up (queryInterface) {
		await queryInterface.createTable(ORDER_TABLE, OrderSchema);
	},

	async down (queryInterface) {
		await queryInterface.dropTable(ORDER_TABLE);
	}
};
