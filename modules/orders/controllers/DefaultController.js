// const path = require('path');

const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
// var menu = require('../../common_model/MenuContent');
// const app = require('../../../app');
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
			cartItem.unit += cartItem.unit/cartItem.quantity;
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
				console.log("PUSH SUCCESS\n");
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
		}
		console.log(res.app.locals.Cart);
		res.json({msg:'success'});
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