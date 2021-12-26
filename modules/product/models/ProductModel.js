const Sequelize = require('sequelize');
const sequelize = require('./../../../config/database');
// const OrderModel = require('../../orders/models/OrderModel');
// const OrderItemModel = require('../../orders/models/OrderItemModel');

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

// // ProductModel.belongsToMany(OrderModel, {through: OrderItemModel});
// // ProductModel.associate = (models) => {
// 	ProductModel.belongsToMany(sequelize.models.Order, {through: sequelize.models.OrderItem});
// 	// sequelize.sync();
// 	// OrderModel.hasMany(models.OrderItemModel, {foreignKey: 'order_id'});
// 	// OrderModel.belongsTo(models.Product, {foreignKey: 'product_id'});
// // };

module.exports = ProductModel;