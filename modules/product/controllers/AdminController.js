const path = require('path');
const { Op } = require("sequelize");

const Loader = require("./../../../core/Loader");
const ProductModel = Loader.loadModel('product');

class AdminController {

	index(req, res) {
		const condition = {
			order: [['id', 'DESC']]
		};

		ProductModel.findAll(condition)
			.then(function(products) {
				res.render("list", {
					title: "Product",
					data: products
				});	
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
	}

	list(req, res) {
		const productPerPage = 2;
		const page = +req.params.page || 1;

		const offset = (page - 1) * productPerPage;
		const condition = {
			order: [['id', 'DESC']],
			offset: offset,
			limit: productPerPage
		};

		ProductModel.findAll(condition)
			.then((products) => {
				res.render('list', {
					data: products
				});
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
	}

	add(req, res) {
		if (req.method == "POST") {
			ProductModel.create(req.body).then(() => {})
		}

		res.render("add", {
			title: "Product",
		});
	}

	update(req, res) {
		const condition = {
			where: {id: parseInt(req.params.productId) }
		};

		if (req.method == "POST") {
			ProductModel.update(req.body, condition).then(() => {});
		}

		ProductModel.findOne(condition)
			.then((product) => {
				res.render("update", {
					title: "Product",
					data: product
				});	
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			})
	}

	delete(req, res) {
		const condition = {
			where: {id: parseInt(req.params.productId) }
		};

		ProductModel.destroy(condition)
			.then(() => {
				res.redirect("/products/admin/list");
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
	}

	search(req, res) {
		const queryName = req.query.queryName;
		const productPerPage = 2;
		const page = +req.query.page || 1;

		const offset = (page - 1) * productPerPage;
		const condition = {
			where: { name: {[Op.like]: "%" + queryName + "%"}},
			offset: offset,
			limit: productPerPage
		};

		ProductModel.findAll(condition)
			.then((products) => {
				res.render('search', {
					title: "Product",
					data: products,
					queryName: queryName,
					page: page
				})
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
	}

	listCategory(req, res) {

		res.render("categoryList", {
			title: "Product",
			content: "Admin: index"
		});
	}

	addCategory(req, res){

		res.render("categoryAdd", {
			title: "Product",
		});
	}

	updateCategory(req, res){

		res.render("categoryUpdate", {
			title: "Product",
		});
	}
}

module.exports = new AdminController();