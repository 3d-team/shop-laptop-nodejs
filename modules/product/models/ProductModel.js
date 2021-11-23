const Sequelize = require('sequelize');
const sequelize = require('./../../../config/database');

const ProductModel = sequelize.define('Product', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	category: Sequelize.STRING,
	description: Sequelize.STRING,
	content: Sequelize.STRING,
	quantity: Sequelize.INTEGER,
	price: Sequelize.DOUBLE,
	thumbnail: Sequelize.STRING,
	image: Sequelize.STRING,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE
}, {
	tableName: "products",
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});


module.exports = ProductModel;