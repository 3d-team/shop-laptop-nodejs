
const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
const OrderModel = require('../models/OrderModel')
const OrderItemModel = require('../models/OrderItemModel');
const sequelize = require("../../../config/database");
const { QueryTypes, where } = require('sequelize');

class AdminController {

	list(req, res) {
		const layout = 'admin';
		
		if(req.user === undefined){
			console.log("You Need To Login!!");
			return;
		}
		
		OrderModel.findAll({
			order: [['updated_at', 'DESC']]
		}).then((result)=>{
			// console.log(result);
			OrderModel.sum('total_unit').then((sum)=>{
				console.log(sum);
				res.render('orderList', {
					layout: layout,
					data: result,
					numberCart: result.length,
					SumUnit: sum,
					admin: true
				});
			})	
			.catch((err)=>{
				console.log(err);
			})		
		}).catch((err)=>{
			console.log(err);
		})
	}

	detailCart(req, res){
		sequelize.query(`select name, order_items.quantity, price
				from orders, order_items, products
				where orders.code = ${req.body.product_id} and 
			  	orders.code = order_items.order_id and
			  	order_items.product_id = products.id`, { type: QueryTypes.SELECT }
		).then((ret)=>{
			console.log(ret);
			res.json({msg: 'success', items: ret});
		}).catch((err)=>{
			console.log(err);
		});
	}

	updateCart(req, res){
		OrderModel.update(
			{delivery_status: req.body.delivery_status}, 
			{
				where: {
					code: req.body.code
				}
			}
		).then((result)=>{
			console.log(result);
			res.json({msg: 'success'});
		}).catch((err)=>{
			console.log(err);
			res.json({msg: 'err'});
		})
	}

	saleStatistic(req, res){
		const layout = 'admin';
		res.render('saleStatistic', {
			layout: layout
		});
	}

	topSale(req, res){
		const layout = 'admin';
		res.render('topSale', {
			layout: layout
		});
	}
}

module.exports = new AdminController();