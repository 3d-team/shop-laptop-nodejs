const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
const OrderModel = Loader.model('order');
const OrderItemModel = require('../models/OrderItemModel');

class DefaultController {

	index(req, res) {
		var items = [];
		for (const value of res.app.locals.Cart.items.values()) {
			items.push(value);
		}
		res.render('orders', {
			title: "Product",
			content: "Default: index",
			data: items
		});
	}

	add(req, res){
		// console.log(req.body.product_id);
		res.app.locals.Cart.number += 1;
		var productID = req.body.product_id
		console.log(productID);
		if(res.app.locals.Cart.items.has(productID)){
			var cartItem = res.app.locals.Cart.items.get(productID);
			cartItem.unit += cartItem.price;
			res.app.locals.Cart.total_unit += cartItem.price;
			cartItem.quantity += 1;
			console.log(productID);
		}
		else{
			ProductModel.findAll({
				where: {
					id: productID
				}
			}).then((products)=>{
				var cartItem = {
					product_id: products[0].dataValues.id,
					name: products[0].dataValues.name,
					quantity: 1,
					price: products[0].dataValues.price, 
					unit: products[0].dataValues.price,
					image: products[0].dataValues.image
				};
				res.app.locals.Cart.items.set(productID, cartItem);
				res.app.locals.Cart.total_unit += cartItem.price;
				console.log("ADD ITEM TO CART SUCCESS\n");
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
		}
		// console.log(res.app.locals.Cart);
		res.json({msg:'success', cart_number: res.app.locals.Cart.number});
	}

	changeNumberItem(req, res){
		// console.log(req.body.product_id);
		if(req.body.number < 0){
			res.json({msg:'negative-number'});
			return;
		}
		var productID = req.body.product_id
		console.log(productID);
		if(res.app.locals.Cart.items.has(productID)){
			var cartItem = res.app.locals.Cart.items.get(productID);
			res.app.locals.Cart.number += req.body.number - cartItem.quantity;
			cartItem.unit += cartItem.price*(req.body.number - cartItem.quantity);
			res.app.locals.Cart.total_unit += cartItem.price*(req.body.number - cartItem.quantity);
			cartItem.quantity = parseInt(req.body.number);
			// console.log(productID);
			res.json({msg:'success', 
					  cart_number: res.app.locals.Cart.number, 
					  total_unit: res.app.locals.Cart.total_unit,
					  total_unit_item: cartItem.unit});
		}
		console.log(res.app.locals.Cart);		
	}

	remove(req, res){
		var productID = req.body.product_id;
		var items = res.app.locals.Cart.items;
		if(items.has(productID)){
			res.app.locals.Cart.total_unit -= items.get(productID).unit;
			res.app.locals.Cart.number -= items.get(productID).quantity;
			if(items.delete(productID)){
				res.json({msg:'success', 
						total_unit: res.app.locals.Cart.total_unit, 
						cart_number: res.app.locals.Cart.number});
			}
			else{
				res.json({msg:'fail'});
			}
		}		
	}

	async submit(req, res){
		// console.log(req.user.id);
		if(res.app.locals.Cart.number <= 0){
			res.json({msg:'empty'});
			return;
		}
		if(req.user === undefined){
			console.log(req.user);
			res.json({msg:'not-login'});
			return;
		}
		if(req.body.confirm_submit == 'YES'){
			var newOrder = {
				customer_id: req.user.id,
				delivery_status: 'Shop đang chuẩn bị hàng!',
				delivery_address: req.body.deliveryAddress
			}

			var result = await OrderModel.create(newOrder);

			console.log("ORDER");
			console.log(result.id);
			for (const value of res.app.locals.Cart.items.values()) {
				var cartItem = {
					order_id: result.id,
					product_id: value.product_id,
					quantity: value.quantity,
					unit: value.unit
				};
				var ret = await OrderItemModel.create(cartItem);
				console.log("CART_ITEM");
				console.log(ret);
				
			}
			res.app.locals.Cart.items.clear();
			res.app.locals.Cart.number = 0;
			res.app.locals.Cart.total_unit = 0;
			res.json({msg:'success'});
		}
	}

	destroy(req, res){
		if(req.body.confirm_destroy == 'YES'){
			res.app.locals.Cart.items.clear();
			res.app.locals.Cart.number = 0;
			res.app.locals.Cart.total_unit = 0;
			res.json({msg:'success'});
		}
	}

	cart(req, res) {

		res.render('orders', {
			title: "Product",
			content: "Default: index"
		});
	}

	list(req, res) {
		const layout = 'admin';
		
		res.render('orderList', {
			layout: layout
		});
	}
}

module.exports = new DefaultController();