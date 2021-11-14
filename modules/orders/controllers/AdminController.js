const path = require('path');

const layout = 'admin';

class AdminController {

	list(req, res) {

		res.render("orderList", {
			layout: layout,
			title: "Orders",
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController();