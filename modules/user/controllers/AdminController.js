const path = require('path');

const layout = 'admin';

class AdminController {

	list(req, res){

		res.render("userList", {
			layout: layout,
			title: "Product",
		});
	}

	add(req, res){

		res.render("userAdd", {
			layout: layout,
			title: "Product",
		});
	}

	update(req, res){

		res.render("userUpdate", {
			layout: layout,
			title: "Product",
		});
	}
}

module.exports = new AdminController();