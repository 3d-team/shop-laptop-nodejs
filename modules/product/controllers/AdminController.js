const path = require('path');

const directory = "product/views/admin";
const layout = 'admin';

class AdminController {

	index(req, res) {

		res.render(path.join(directory, "index"), {
			layout: layout,
			title: "Product",
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController;