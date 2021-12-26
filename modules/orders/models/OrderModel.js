const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
// const OrderItemModel = require('./OrderItemModel');
// const ProductModel = require('../../product/models/ProductModel');
// const { Model } = require('sequelize');

const OrderModel = sequelize.define('Order', 
	{// attribute
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
		total_unit: Sequelize.DOUBLE,
		created_at: Sequelize.DATE,
		updated_at: Sequelize.DATE
	}, 
	{// other option
		tableName: "orders",
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
);

// OrderModel.associate = (models) => {
// 	OrderModel.belongsToMany(models.Product, {through: models.OrderItem});
// 	// sequelize.sync();
// 	// OrderModel.hasMany(models.OrderItemModel, {foreignKey: 'order_id'});
// 	// OrderModel.belongsTo(models.Product, {foreignKey: 'product_id'});
// };

module.exports = OrderModel;

// class Order extends Model{};

// Order.init(
// 	{// attribute
// 		code: {
// 			type: Sequelize.INTEGER,
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true
// 		},
// 		customer_id: Sequelize.INTEGER,
// 		delivery_status: Sequelize.STRING,
// 		delivery_address: Sequelize.TEXT,
// 		fullname_receiver: Sequelize.TEXT,
// 		phone_receiver: Sequelize.STRING,
// 		payment_status: Sequelize.STRING,
// 		status: Sequelize.INTEGER,
// 		total_unit: Sequelize.DOUBLE,
// 		created_at: Sequelize.DATE,
// 		updated_at: Sequelize.DATE
// 	}, 
// 	{// order option
// 		tableName: "orders",
// 		createdAt: 'created_at',
// 		updatedAt: 'updated_at',
// 		sequelize,
// 		modelName: 'Order'
// 	}
// )

// const OrderModel = new Order();