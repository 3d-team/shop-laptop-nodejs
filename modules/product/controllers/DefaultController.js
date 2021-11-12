const path = require('path');

class DefaultController {

	index(req, res) {

		res.render('index', {
			title: "Product",
			content: "Default: index"
		});
	}
}

module.exports = new DefaultController();