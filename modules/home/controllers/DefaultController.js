const path = require('path');

class DefaultController {

	index(req, res) {

		res.render('index', {
			title: "Home",
			content: "Default: index"
		});
	}
}

module.exports = new DefaultController();