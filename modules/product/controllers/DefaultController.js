const path = require('path');

class DefaultController {

	index(req, res) {

		res.render('productList', {
			title: "Product",
			content: "Default: index",
			home_menu_item_status: "",
			products_menu_item_status: "item-active",
			about_menu_item_status: "",
			contact_menu_item_status: ""
		});
	}

	detail(req, res) {
		
		res.render('productDetail', {
			title: "Product",
			content: "Default: index",
			home_menu_item_status: "",
			products_menu_item_status: "item-active",
			about_menu_item_status: "",
			contact_menu_item_status: ""
		});
	}
}

module.exports = new DefaultController();