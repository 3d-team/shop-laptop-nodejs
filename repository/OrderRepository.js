const sequelize = require("./../config/database");
const { QueryTypes, where } = require('sequelize');

const OrderModel = require('./../modules/orders/models/OrderModel');
const OrderItemModel = require('./../modules/orders/models/OrderItemModel');

class OrderRepository {
	async findAll() {
		const condition = {
			order: [
				['updated_at', 'DESC']
			]
		};
		const orders = await OrderModel.findAll(condition);
		if (!orders) {
			return [];
		}

		return orders;
	}

	async findAllByUserId(userId) {
		const condition = {
			where: {
				customer_id: userId
			},
			order: [
				['updated_at', 'DESC']
			]
		};
		const orders = await OrderModel.findAll(condition);
		if (!orders) {
			return [];
		}

		return orders;
	}

	async sumByTotalUnit() {
		const sumTotalUnit = await OrderModel.sum('total_unit');
		return sumTotalUnit;
	}

	async sumTotalUnitbyUserId(userId) {
		const sumTotalUnit = await OrderModel.sum('total_unit', {where:{customer_id: userId}});
		return sumTotalUnit;
	}

	async findByCode(code) {
		const query = `
			SELECT name, order_items.quantity, price, products.image as image
			FROM orders, order_items, products
			WHERE orders.code = ${code} 
				AND orders.code = order_items.order_id 
				AND order_items.product_id = products.id
		`;
		const order = await sequelize.query(query, { type: QueryTypes.SELECT });
		
		return order;
	}

	async createOrder(data) {
		const order = await OrderModel.create(data);
		return order;
	}

	async createOrderDetail(data) {
		const orderDetail = await OrderItemModel.create(data);
		return orderDetail;
	}

	async updateByCode(code, data) {
		const isUpdated = await OrderModel.update(data, {where: {code: code}});
		return isUpdated;
	}
}

module.exports = OrderRepository;