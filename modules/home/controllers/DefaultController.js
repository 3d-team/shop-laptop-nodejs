const path = require('path');

const layout = "default";

class DefaultController {

	index(req, res) {

		res.render('index', {
			layout: layout,
			title: "Home",
			content: "Default: index",
			home_menu_item_status: "item-active",
			products_menu_item_status: "",
			about_menu_item_status: "",
			contact_menu_item_status: ""
		});
	}

	about(req, res) {

		res.render('aboutUs', {
			layout: layout,
			title: "Home",
			content: "Default: index",
			home_menu_item_status: "",
			products_menu_item_status: "",
			about_menu_item_status: "item-active",
			contact_menu_item_status: ""
		});
	}

	contact(req, res) {

		res.render('contactUs', {
			layout: layout,
			title: "Home",
			content: "Default: index",
			home_menu_item_status: "",
			products_menu_item_status: "",
			about_menu_item_status: "",
			contact_menu_item_status: "item-active"
		});
	}
}

module.exports = new DefaultController();