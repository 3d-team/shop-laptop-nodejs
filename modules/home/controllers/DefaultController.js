const app = require('../../../app');
var menu = require('../../common_model/MenuContent');

class DefaultController {
	
	index(req, res) {
<<<<<<< HEAD
		
=======
		console.log(__dirname);
		// app.locals.Cart.number = req.app.locals.CartSize;
>>>>>>> main
		console.log(__dirname);
		// app.locals.Cart.number = req.app.locals.CartSize;
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