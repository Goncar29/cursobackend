'use strict';

/** @type {import('sequelize-cli').Migration} */
const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');

module.exports = {
	async up (queryInterface) {
        await queryInterface.addColumn(USER_TABLE, 'role', {
            allowNull: false,
			type: DataTypes.STRING,
			defaultValue: 'customer'
        });
	},

	async down (queryInterface) {
		await queryInterface.removeColumn(USER_TABLE, 'role');
	}
};
