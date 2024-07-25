const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products'; // nombre de la tabla

const ProductSchema = {
	// El esquema define la estructura de la BD.
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	image: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	description: {
		allowNull: false,
		type: DataTypes.TEXT,
	},
	price: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
	categoryId: {
		field: 'category_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: CATEGORY_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

class Product extends Model {
	static associate(models) {
		this.belongsTo(models.Category, { as: 'category' });
	}

	static config(sequelize) {
		return {
		sequelize,
		tableName: PRODUCT_TABLE,
		modelName: 'Product',
		timestamps: false,
		};
	}
}

module.exports = { Product, PRODUCT_TABLE, ProductSchema };
