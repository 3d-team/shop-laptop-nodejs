const path = require('path');

class AdminController {

	index(req, res) {
		const view = "product/views/default";

		res.render(path.join(view, 'index'), {
			layout: 'layouts/admin',
			title: "Product",
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController;