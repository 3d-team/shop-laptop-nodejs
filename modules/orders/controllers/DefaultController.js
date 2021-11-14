const path = require('path');

class DefaultController {

	index(req, res) {

		res.render('orders', {
			title: "Product",
			content: "Default: index"
		});
	}
}

module.exports = new DefaultController();