const path = require('path');

const view = "home/views/default";
const layout = "default";

class DefaultController {

	index(req, res) {

		res.render(path.join(view, 'index'), {
			layout: layout,
			title: "Home",
			content: "Default: index"
		});
	}
}

module.exports = new DefaultController;