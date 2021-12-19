const menu = require('../../common_model/MenuContent');
class DefaultController {
	
	index(req, res) {

		res.render('index', {
			content: "Default: index",
			menuContent: menu.getContentHomeMenuItem()
		});
	}

	about(req, res) {

		res.render('aboutUs', {
			content: "Default: index",
			menuContent: menu.getContentAboutMenuItem()
		});
	}

	contact(req, res) {

		res.render('contactUs', {
			content: "Default: index",
			menuContent: menu.getContentContactMenuItem()
		});
	}
}

module.exports = new DefaultController();