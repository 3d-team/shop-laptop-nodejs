const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
const OrderModel = require('../models/OrderModel')
const OrderItemModel = require('../models/OrderItemModel');

const sequelize = require("../../../config/database");
const { QueryTypes } = require('sequelize');


class DefaultController {

	index(req, res) {
		const cart = res.app.locals.Cart.items;
		const items = [...cart.values()];

		res.render('orders', {
			data: items,
		});
	}

	async add(req, res){
		const cart = res.app.locals.Cart;
		const productId = req.body.product_id;

		const cartService = req.app.get('context').make('cartService');
		await cartService.addCartItem(productId, cart);

		return res.json({
			msg:'success', 
			cart_number: cart.number
		});
	}

	changeNumberItem(req, res){
		
		if (req.body.number <= 0) {
			return res.json({msg:'negative-number'});
		}

		const cart = res.app.locals.Cart;
		const productID = req.body.product_id;
		if(!cart.items.has(productID)){
			return res.json({msg:'not-found-product'});
		}	

		const cartService = req.app.get('context').make('cartService');

		const unit = req.body.number;
		const cartItem = cartService.modifyCartItem(productID, unit, cart);
		
		return res.json({
			msg:'success', 
		    cart_number: cart.number, 
			total_unit: cart.total_unit,
			total_unit_item: cartItem.unit
		});
	}

	remove(req, res){
		const cart = res.app.locals.Cart;
		const productID = req.body.product_id;

		if (!cart.items.has(productID)) {
			return res.json({msg:'fail'});
		}

		const cartService = req.app.get('context').make('cartService');
		if (!cartService.removeCartItem(productID, cart)) {
			return res.json({msg:'fail'});	
		}

		return res.json({
			msg:'success', 
			total_unit: cart.total_unit, 
			cart_number: cart.number
		});	
	}

	async submit(req, res){
		const cart = res.app.locals.Cart;
		
		if (cart.number <= 0) {
			return res.json({msg:'empty'});
		}

		if (req.user == undefined) {
			return res.json({msg:'not-login'});
		}

		if (req.body.confirm_submit != 'YES') {
			return res.json({msg:'not-confirm'});
		}

		const cartService = req.app.get('context').make('cartService');
		await cartService.submitCart(req, cart);
		cartService.destroyCart(cart);

		return res.json({msg:'success'});
	}

	destroy(req, res) {
		
		if (req.body.confirm_destroy != 'YES') {
			return res.json({msg: 'not-confirm'});
		}

		const cartService = req.app.get('context').make('cartService');
		cartService.destroyCart(res.app.locals.Cart);

		return res.json({msg:'success'});
	}

	cart(req, res) {
		res.render('orders');
	}

	async list(req, res) {
		const orderRepository = req.app.get('context').make('orderRepository');
		const orders = await orderRepository.findAllByUserId(req.user.id);
		const sum = await orderRepository.sumTotalUnitbyUserId(req.user.id);

		res.render('orderList', {
			layout: 'admin',
			data: orders,
			numberCart: orders.length,
			SumUnit: sum,
			admin: false
		});	
	}

	async detailCart(req, res){
		const orderRepository = req.app.get('context').make('orderRepository');
		const order = await orderRepository.findByCode(req.body.product_id);
		
		return res.json({
			msg: 'success', 
			items: order
		});
	}
}

module.exports = new DefaultController();