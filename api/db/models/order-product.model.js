const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products'; // nombre de la tabla

const orderProductSchema = {
	// El esquema define la estructura de la BD.
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
	amount: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	orderId: {
		field: 'order_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: ORDER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	productId: {
		field: 'product_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: PRODUCT_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

class OrderProduct extends Model {
	static associate(models) {

	}

	static config(sequelize) {
		return {
		sequelize,
		tableName: ORDER_PRODUCT_TABLE,
		modelName: 'OrderProdct',
		timestamps: false,
		};
	}
}

module.exports = { OrderProduct, ORDER_PRODUCT_TABLE, orderProductSchema };
