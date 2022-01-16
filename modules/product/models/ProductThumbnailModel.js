const Sequelize = require('sequelize');
const sequelize = require('./../../../config/database');

const ProductThumnailModel = sequelize.define('ProductThumnail', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	filename: Sequelize.STRING,
	product_id: Sequelize.INTEGER,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE
}, {
	tableName: "product_thumbnails",
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = ProductThumnailModel;