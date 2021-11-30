const path = require('path');

const ProductModel = require('./../models/ProductModel');

class DefaultController {

	index(req, res) {
		const productPerPage = 2;
		const page = +req.params.page || 1;

		const offset = (page - 1) * productPerPage;
		const condition = {
			offset: offset,
			limit: productPerPage
		};

		ProductModel.findAll(condition)
			.then((products) => {
				res.render('productList', {
					title: "Product",
					data: products
				});
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
	}

	detail(req, res) {
		const productId = req.params.productId;
		
		const condition = {
			where: { id: productId }
		};

		ProductModel.findOne(condition)
			.then((product) => {
				res.render('productDetail', {
					title: "Product",
					data: product
				});
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
		
	}
}

module.exports = new DefaultController();