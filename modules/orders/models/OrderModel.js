const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

const OrderModel = sequelize.define('Order', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	customer_id: Sequelize.INTEGER,
	delivery_status: Sequelize.STRING,
	delivery_address: Sequelize.TEXT,
	status: Sequelize.INTEGER,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE
}, {
	tableName: "orders",
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});


module.exports = OrderModel;