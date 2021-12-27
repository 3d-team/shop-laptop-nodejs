const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');
const CommentModel = Loader.model('comment');

var menu = require('../../common_model/MenuContent');
const app = require('../../../app');

class DefaultController {

	index(req, res) {
		const productPerPage = 4;
		const page = +req.query.page || 1;
		const category = req.query.category;
		const price = req.query.price;
		const sortBy = req.query.sortBy;

		const offset = (page - 1) * productPerPage;
		const condition = {
			offset: offset,
			limit: productPerPage
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

		if(sortBy){
			condition.order = [ ['price' , sortBy] ];
		}

		ProductModel.findAll(condition)
			.then((products) => {
				res.render('productList', {
					data: products,
					pageNumber: page,
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
				ProductModel.findAll({
					where: {
						id: {[Op.ne]: product.id},
						category: product.category
					}})
				.then((products) => {
					res.render('productDetail', {
						title: "Product",
						data: product,
						productRelated: products,
						menuContent: menu.getContentProductMenuItem()
					});
				})
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
		
	}

	search(req, res){
		const productPerPage = 4;
		const page = +req.query.page || 1;
		const offset = (page - 1) * productPerPage;
		const sortBy = req.query.sortBy;

		const keyword = req.query.keyword;

		const condition = {
			offset: offset,
			limit: productPerPage,
			where: { name: { [Op.like]: '%' + keyword + '%'} }
		};

		if(sortBy){
			condition.order = [ ['price' , sortBy] ];
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

	comment(req, res){
		const productId = req.params.productId;
		const username = req.body.username;
		const content = req.body.content;

		const comment = {
			name: username, 
			content: content, 
			product_id: productId
		};
		console.log(comment);
		CommentModel.create(comment)
			.then((result) => {	 
				res.status(200);
				res.json({
					msg:'success',
					creatTime: result.created_at.toLocaleString()
				});
			})
			.catch((err) => {
				res.status(500);
			});
	}

	getComment(req, res){
		const productId = req.params.productId;
		const commentPerPage = 5;
		const page = req.query.page || 1;
		const offset = (page - 1) * commentPerPage;

		const condition = {
			offset: offset,
			limit: commentPerPage,
			where: {product_id: productId}
		};

		CommentModel.findAll(condition)
			.then((comments) => {
				res.status(200);
				res.json({
					data: comments
				})
			})
			.catch(function(err) {
				res.status(err.status || 500);
			});
	}
}

module.exports = new DefaultController();