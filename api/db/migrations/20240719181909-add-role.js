'use strict';

/** @type {import('sequelize-cli').Migration} */
const { UserSchema, USER_TABLE } = require('../models/user.model');
module.exports = {
	async up (queryInterface) {
        await queryInterface.addColumn(USER_TABLE, 'role', {
            type: UserSchema.role.type,
            allowNull: UserSchema.role.allowNull,
            defaultValue: UserSchema.role.defaultValue,
        });
	},

	async down (queryInterface) {
		await queryInterface.removeColumn(USER_TABLE, 'role', UserSchema);
	}
};
