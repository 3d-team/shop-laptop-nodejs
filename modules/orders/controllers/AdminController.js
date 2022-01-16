const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
const OrderModel = require('../models/OrderModel')
const OrderItemModel = require('../models/OrderItemModel');
const sequelize = require("../../../config/database");
const { QueryTypes, where } = require('sequelize');

class AdminController {
	
	async list(req, res) {
		const orderRepository = req.app.get('context').make('orderRepository');
		const orders = await orderRepository.findAll();
		const sumTotalUnit = await orderRepository.sumByTotalUnit();
		
		res.render('orderList', {
			layout: 'admin',
			data: orders,
			numberCart: orders.length,
			SumUnit: sumTotalUnit,
			admin: true
		});
	}

	async detailCart(req, res) {
		const orderRepository = req.app.get('context').make('orderRepository');
		const order = await orderRepository.findByCode(req.body.product_id);
		
		res.json({msg: 'success', items: order});
	}

	async updateCart(req, res) {
		const orderRepository = req.app.get('context').make('orderRepository');

		const data = {delivery_status: req.body.delivery_status};
		const isUpdated = await orderRepository.updateByCode(req.body.code, data);

		if (isUpdated) {
			res.json({msg: 'success'});
		} else {
			res.json({msg: 'err'});
		}
	}

	saleStatistic(req, res){
		res.render('saleStatistic', { layout: 'admin' });
	}

	topSale(req, res){
		res.render('topSale', { layout: 'admin' });
	}
}

module.exports = new AdminController();