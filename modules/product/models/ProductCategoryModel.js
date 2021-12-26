const Sequelize = require('sequelize');
const sequelize = require('./../../../config/database');

var ProductCategoryModel = sequelize.define('ProductCategory', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	description: Sequelize.STRING,
	content: Sequelize.STRING,
	thumbnail: Sequelize.STRING,
	image: Sequelize.STRING,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE
}, {
	tableName: "product_categories",
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});


module.exports = ProductCategoryModel;