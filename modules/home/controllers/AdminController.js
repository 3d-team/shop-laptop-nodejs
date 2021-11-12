const path = require('path');

const view = "home/views/admin";
const layout = "admin";

class AdminController {

	index(req, res) {

		res.render(path.join(view, 'index'), {
			layout: layout,
			title: "Home",
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController;