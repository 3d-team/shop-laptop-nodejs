const path = require('path');

const layout = "default";

class DefaultController {

	index(req, res) {

		res.render('index', {
			layout: layout,
			title: "Home",
			content: "Default: index"
		});
	}

	about(req, res) {

		res.render('aboutUs', {
			layout: layout,
			title: "Home",
			content: "Default: index"
		});
	}

	contact(req, res) {

		res.render('contactUs', {
			layout: layout,
			title: "Home",
			content: "Default: index"
		});
	}
}

module.exports = new DefaultController();