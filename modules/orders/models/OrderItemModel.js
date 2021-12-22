const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

const OrderItemModel = sequelize.define('OrderItem', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	order_id: Sequelize.INTEGER,
	product_id: Sequelize.INTEGER,
	quantity: Sequelize.INTEGER,
    unit: Sequelize.DOUBLE,
	status: Sequelize.INTEGER,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE
}, {
	tableName: "order_items",
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = OrderItemModel;