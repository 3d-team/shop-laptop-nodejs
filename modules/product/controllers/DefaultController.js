const path = require('path');

const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
const menu = require('../../common_model/MenuContent');

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
					data: products,
					menuContent: menu.getContentProductMenuItem()
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
					data: product,
					menuContent: menu.getContentProductMenuItem()
				});
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
		
	}
}

module.exports = new DefaultController();