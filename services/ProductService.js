const multer = require("multer");
const fs = require('fs');
const mkdirp = require("mkdirp");

const { Op } = require("sequelize");

const config = require("./../config/config");

class ProductService {
	async getAllProduct(request) {
		const productRepository = request.app.get('context').make('productRepository');
		const products = await productRepository.findAll();
		return products;
	}

	async getPagedProducts(request) {
		const productPerPage = 2;
		const page = +request.params.page || 1;
		const offset = (page - 1) * productPerPage;
		const condition = {
			order: [['id', 'DESC']],
			offset: offset,
			limit: productPerPage
		};
		const productRepository = request.app.get('context').make('productRepository');
		const products = await productRepository.findAll(condition);
		return products;
	}

	uploadProduct(request, response) {
		const storage = multer.diskStorage({
			destination: config.UPLOAD_DIR,
			filename: function(req, file, cb){
				cb(null, file.originalname);
			}
		});

		const uploadfunc = multer({
			storage: storage,
			limits: {
				fileSize: 1000000
			},
		}).single('thumbnail');

		const data = {
			name: request.body.name,
			description: request.body.description,
			content: request.body.content,
			quantity: request.body.quantity,
			price: request.body.price,
			image: request.file.originalname,
		};
		const productRepository = request.app.get('context').make('productRepository');

		uploadfunc(request, response, (err) =>{
			if (err) {
				return null;
			} else {
				const product = productRepository.createProduct(data);
				return product;
			}
		});
	}

	async searchProduct(request, queryName, page, productPerPage = 2) {
		const offset = (page - 1) * productPerPage;
		const condition = {
			where: { name: {[Op.like]: "%" + queryName + "%"}},
			offset: offset,
			limit: productPerPage
		};

		const productRepository = request.app.get('context').make('productRepository');
		const products = await productRepository.findAll(condition);
		return products;
	}
}

module.exports = ProductService;