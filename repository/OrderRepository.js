const sequelize = require("./../config/database");
const { QueryTypes, where } = require('sequelize');

const OrderModel = require('./../modules/orders/models/OrderModel');

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

	async sumByTotalUnit() {
		const sumTotalUnit = await OrderModel.sum('total_unit');
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

	async updateByCode(code, data) {
		const condition = {
			where: {
				code: code
			}
		};

		const isUpdated = await OrderModel.update(data, condition);

		return isUpdated;
	}
}

module.exports = OrderRepository;