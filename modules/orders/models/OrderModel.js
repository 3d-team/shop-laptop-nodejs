const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

const OrderModel = sequelize.define('Order', {
	code: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	customer_id: Sequelize.INTEGER,
	delivery_status: Sequelize.STRING,
	delivery_address: Sequelize.TEXT,
	fullname_receiver: Sequelize.TEXT,
	phone_receiver: Sequelize.STRING,
	payment_status: Sequelize.STRING,
	status: Sequelize.INTEGER,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE
}, {
	tableName: "orders",
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});


module.exports = OrderModel;