const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const OrderModel = require('./OrderModel');
const ProductModel = require('../../product/models/ProductModel');
const { Model } = require('sequelize');

var OrderItemModel = sequelize.define('OrderItem', 
	{// attribute
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		order_id: {
			type: Sequelize.INTEGER,
			references:{
				model: OrderModel,
				key: 'code'
			}
		},
		product_id:  {
			type: Sequelize.INTEGER,
			references:{
				model: ProductModel,
				key: 'id'
			}
		},
		quantity: Sequelize.INTEGER,
		unit: Sequelize.DOUBLE,
		status: Sequelize.INTEGER,
		created_at: Sequelize.DATE,
		updated_at: Sequelize.DATE
	}, 
	{// other option
		tableName: "order_items",
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
);

// OrderItemModel.associate = (models) => {
// 	OrderItemModel.belongsTo(models.Order, {foreignKey: 'order_id'});
// 	OrderItemModel.belongsTo(models.Product, {foreignKey: 'product_id'});
// 	// sequelize.sync();
// };
// OrderItemModel.belongsTo(OrderModel, {foreignKey: 'order_id'});
// OrderItemModel.belongsTo(ProductModel, {foreignKey: 'product_id'});
module.exports = OrderItemModel;

// class OrderItem extends Model{};

// OrderItem.init(
// 	{// model attribute
// 		id: {
// 			type: Sequelize.INTEGER,
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true
// 		},
// 		order_id: {
// 			type: Sequelize.INTEGER,
// 			references:{
// 				model: OrderModel,
// 				key: 'code'
// 			}
// 		},
// 		product_id:  {
// 			type: Sequelize.INTEGER,
// 			references:{
// 				model: ProductModel,
// 				key: 'id'
// 			}
// 		},
// 		quantity: Sequelize.INTEGER,
// 		unit: Sequelize.DOUBLE,
// 		status: Sequelize.INTEGER,
// 		created_at: Sequelize.DATE,
// 		updated_at: Sequelize.DATE
// 	},
// 	{//other option
// 		tableName: "order_items",
// 		createdAt: 'created_at',
// 		updatedAt: 'updated_at',
// 		sequelize,
// 		modelName: 'OrderItem'
// 	}
// )

// const OrderItemModel = new OrderItem();