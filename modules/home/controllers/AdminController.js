const path = require('path');

const layout = "admin";

class AdminController {

	index(req, res) {

		res.render('adminIndex', {
			layout: layout,
			title: "Home",
			content: "Admin: index"
		});
	}

	revenue(req, res) {

		res.render('revenue', {
			layout: layout,
			title: "Home",
			content: "Admin: index"
		});
	}

	bestseller(req, res) {

		res.render('bestseller', {
			layout: layout,
			title: "Home",
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController();