class DefaultController {

	index(req, res) {

		res.render('orders', {
			title: "Product",
			content: "Default: index"
		});
	}

	cart(req, res) {

		res.render('orders', {
			title: "Product",
			content: "Default: index"
		});
	}

	list(req, res) {
		const layout = 'admin';
		
		res.render('orderList', {
			layout: layout
		});
	}
}

module.exports = new DefaultController();