const path = require('path');

const view = "product/views/default";
const layout = "default";

class DefaultController {

	index(req, res) {

		res.render(path.join(view, 'index'), {
			layout: layout,
			title: "Product",
			content: "Default: index"
		});
	}
}

module.exports = new DefaultController;