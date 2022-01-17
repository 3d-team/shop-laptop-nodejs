const ProductCategoryModel = require("../models/ProductCategoryModel");
const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');

class AdminController {

	async index(req, res) {
		const productRepository = req.app.get('context').make('productRepository');
		const products = await productRepository.findAll();
		res.render("list", {
			data: products
		});
	}

	async list(req, res) {
		const productService = req.app.get('context').make('productService');
		const products = await productService.getPagedProducts(req);
		res.render('list', {
			data: products
		});
	}

	add(req, res) {
		ProductCategoryModel.findAll().then((categories) => {
			res.render("add", {
				data: categories
			});
		})
	}
	
	async upload(req, res){
		const productService = req.app.get('context').make('productService');
		const product = productService.uploadProduct(req, res);
	}

	async update(req, res) {
		const condition = {
			where: {id: parseInt(req.params.productId) }
		};

		if (req.method == "POST") {
			ProductModel.update(req.body, condition).then(() => {
				res.redirect("/products/admin/list");
			});
		}

		const product = await ProductModel.findOne(condition)
		const categories = await ProductCategoryModel.findAll();
		res.render("update", {
			data: product,
			categories: categories
		});	
	}

	async delete(req, res) {
		const condition = {
			where: {id: parseInt(req.params.productId) }
		};

		await ProductModel.destroy(condition);
		res.redirect("/products/admin/list");
	}

	async search(req, res) {
		const queryName = req.query.queryName;
		const page = +req.query.page || 1;

		const productService = req.app.get('context').make('productService');
		const products = await productService.searchProduct(req, queryName, page);

		res.render('search', {
			title: "Product",
			data: products,
			queryName: queryName,
			page: page
		})
	}

	listCategory(req, res) {
		res.render("categoryList");
	}

	addCategory(req, res){
		res.render("categoryAdd");
	}

	updateCategory(req, res){
		res.render("categoryUpdate");
	}
}

module.exports = new AdminController();