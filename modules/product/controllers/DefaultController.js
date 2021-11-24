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

		ProductModel.findAll(condition).then((products) => {
			res.render('productList', {
				title: "Product",
				data: products
			});
		});
	}

	detail(req, res) {
		const productId = req.params.productId;
		const condition = {
			where: { id: productId }
		};

		ProductModel.findOne(condition).then((product) => {
			res.render('productDetail', {
				title: "Product",
				data: product
			});
		})
		
	}
}

module.exports = new DefaultController();