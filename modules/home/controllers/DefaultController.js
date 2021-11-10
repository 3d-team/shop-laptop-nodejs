const path = require('path');

class DefaultController {

	index(req, res) {
		const view = "home/views/default";

		res.render(path.join(view, 'index'), {
			layout: 'layouts/default',
			title: "title",
			content: "Default: index"
		});
	}
}

module.exports = new DefaultController;