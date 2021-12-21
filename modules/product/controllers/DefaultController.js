const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
const menu = require('../../common_model/MenuContent');

class DefaultController {

	index(req, res) {
		const productPerPage = 4;
		const page = +req.params.page || 1;
		const category = req.query.category;
		const price = req.query.price;

		const offset = (page - 1) * productPerPage;
		const condition = {
			offset: offset,
			limit: productPerPage,
		};

		if (category){
			condition.where = { category : category}
		}

		if (price){
			var conditionPriceObj;
			if(price == 'duoi-10-trieu'){
				conditionPriceObj = {[Op.lt]: 10000000};
			}else if(price == '10-15-trieu'){
				conditionPriceObj = {[Op.between]: [10000000, 15000000]};
			}else if(price == '15-20-trieu'){
				conditionPriceObj = {[Op.between]: [15000000, 20000000]};
			}else{
				conditionPriceObj = {[Op.gt]: 20000000};
			}

			if(condition.where){
				condition.where["price"] = conditionPriceObj;
			} else {
				condition.where = { price : conditionPriceObj};
			}
		}

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

	search(req, res){
		const keyword = req.query.keyword;
		console.log("LVD",keyword);
		const condition = {
			where: { name: { [Op.like]: '%' + keyword + '%'} }
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
}

module.exports = new DefaultController();