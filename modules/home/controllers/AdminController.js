const path = require('path');

const layout = "admin";

class AdminController {

	index(req, res) {

		res.render('index', {
			layout: layout,
			title: "Home",
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController();