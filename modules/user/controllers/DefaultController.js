const path = require('path');

const layout = "login-register";

class DefaultController {

	login(req, res) {

		res.render('login', {
			layout: layout,
			title: "Login",
		});
	}

	register(req, res) {

		res.render('register', {
			layout: layout,
			title: "Register",
		});
	}
}

module.exports = new DefaultController();