class AdminController {

	index(req, res) {

		res.render('adminIndex', {
			title: "Home",
			content: "Admin: index"
		});
	}

	revenue(req, res) {

		res.render('revenue', {
			title: "Home",
			content: "Admin: index"
		});
	}

	bestseller(req, res) {

		res.render('bestseller', {
			title: "Home",
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController();