const path = require('path');

class AdminController {

	index(req, res) {
		const title = "Home";
		const view = "home/views/default";

		res.render(path.join(view, 'index'), {
			title: title,
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController;