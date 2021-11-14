const path = require('path');

const layout = 'admin';

class AdminController {

	listCategory(req, res) {

		res.render("categoryList", {
			layout: layout,
			title: "Product",
			content: "Admin: index"
		});
	}

	addCategory(req, res){

		res.render("categoryAdd", {
			layout: layout,
			title: "Product",
		});
	}

	updateCategory(req, res){

		res.render("categoryUpdate", {
			layout: layout,
			title: "Product",
		});
	}

	list(req, res){

		res.render("list", {
			layout: layout,
			title: "Product",
		});
	}

	add(req, res){

		res.render("add", {
			layout: layout,
			title: "Product",
		});
	}

	update(req, res){

		res.render("update", {
			layout: layout,
			title: "Product",
		});
	}
}

module.exports = new AdminController();