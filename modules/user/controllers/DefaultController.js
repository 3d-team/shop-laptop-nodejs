const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const config = require('./../../../config/config');
const Loader = require("./../../../core/Loader");
const UserModel = Loader.model('user');

class DefaultController {

	register(req, res){
		res.render('register', {
			layout: null,
			message: req.flash('message')
		});
	}

	login(req, res){		
		res.render('login', {
			layout: null,
			message: req.flash('message')
		});
	}

	logout(req, res) {
		req.logout();
		return res.redirect('/login');
	}

	personal(req, res) {
		const layout = 'admin';

		const condition = {
			where: {id: req.user.id}
		};

		UserModel.findOne(condition).then((user) => {
			res.render('personal', {
				layout: layout,
				data: user
			});
		})
	}
}

module.exports = new DefaultController();