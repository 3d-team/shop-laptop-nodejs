const path = require('path');
const { Op } = require("sequelize");

const Loader = require("./../../../core/Loader");
const ProductModel = Loader.model('product');

const multer = require("multer");
const fs = require('fs');
const mkdirp = require("mkdirp");

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../../../public/images/uploads'),
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const uploadfunc = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    // fileFilter: function(req, file, cb){
    //     checkFileType(file, cb);
    // }
}).single('thumbnail');

class AdminController {

	index(req, res) {
		const condition = {
			order: [['id', 'DESC']]
		};

		ProductModel.findAll(condition)
			.then(function(products) {
				res.render("list", {
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
		res.render("add");
	}
	

	upload(req, res){

		uploadfunc(req, res, (err) =>{
			if (err) {
				res.send(err);
			} else {
				const data = {
					name: req.body.name,
					description: req.body.description,
					content: req.body.content,
					quantity: req.body.quantity,
					price: req.body.price,
					image: req.file.originalname,
				};

				ProductModel.create(data).then((ret) => {
					res.send('Successful');
				}).catch((err)=>{
					console.log(err);
					res.send("Error.");
				})
			}
		});
		
	}

	update(req, res) {
		const condition = {
			where: {id: parseInt(req.params.productId) }
		};

		if (req.method == "POST") {
			ProductModel.update(req.body, condition).then(() => {
				return res.redirect("/products/admin/list");
			});
		}

		ProductModel.findOne(condition)
			.then((product) => {
				return res.render("update", {
					title: "Product",
					data: product
				});	
			})
			.catch(function(err) {
				res.status(err.status || 500);
				return res.render('error');
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