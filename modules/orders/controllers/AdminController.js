class AdminController {

	list(req, res) {

		res.render("orderList", {
			title: "Orders",
			content: "Admin: index"
		});
	}
}

module.exports = new AdminController();