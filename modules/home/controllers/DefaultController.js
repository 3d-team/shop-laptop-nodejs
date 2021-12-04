class DefaultController {

	index(req, res) {

		res.render('index', {
			title: "Home",
			content: "Default: index"
		});
	}

	about(req, res) {

		res.render('aboutUs', {
			title: "Home",
			content: "Default: index"
		});
	}

	contact(req, res) {

		res.render('contactUs', {
			title: "Home",
			content: "Default: index"
		});
	}
}

module.exports = new DefaultController();