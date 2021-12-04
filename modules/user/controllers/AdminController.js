const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const config = require('./../../../config/config');
const Loader = require("./../../../core/Loader");
const UserModel = Loader.model('user');

class AdminController {

	list(req, res){

		res.render("listUser", {
			title: "Product",
		});
	}

	add(req, res){

		res.render("addUser", {
			title: "Product",
		});
	}

	update(req, res){

		res.render("updateUser", {
			title: "Product",
		});
	}

	delete(req, res){

	}
}

module.exports = new AdminController();