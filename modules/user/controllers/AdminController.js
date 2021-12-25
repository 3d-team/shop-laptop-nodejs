const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const config = require('./../../../config/config');
const Loader = require("./../../../core/Loader");
const UserModel = Loader.model('user');

class AdminController {

	list(req, res){
		const condition = {
			order: [['id', 'DESC']]
		};

		UserModel.findAll(condition).then((accounts) => {
			res.render("listUser", {
				data: accounts
			});
		});
	}

	add(req, res){
		if (req.method == "POST") {
			const data = {
				username: req.body.username,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8),
				address: req.body.address,
				phone: req.body.phone,
				status: req.body.status,
				sex: req.body.sex,
				admin: Boolean(req.body.admin),
				avatar: req.body.avatar
			};

			UserModel.create(data).then(() => {
				res.redirect("/users/admin/list");
			});
			return;
		}

		res.render("addUser");
	}

	update(req, res){
		const condition = {
			where: {id: parseInt(req.params.userId) }
		};

		if (req.method == "POST") {

			console.log(req.body);

			const data = {
				username: req.body.username,
				email: req.body.email,
				address: req.body.address,
				phone: req.body.phone,
				admin: Boolean(req.body.admin),
				avatar: req.body.avatar,
				status: req.body.status == 'lock' ? 0 : 1,
				sex: req.body.sex == 'female' ? 0 : 1
			};

			UserModel.update(data, condition).then(() => {
				res.redirect("/users/admin/list");
			});
			return;
		}

		UserModel.findOne(condition).then((account) => {
			res.render("updateUser", {
				data: account,
				isActive: account.status == 1 ? true : false,
				isMale: account.sex == 1 ? true : false
			});
		})
	}

	delete(req, res){
		const condition = {
			where: {id: parseInt(req.params.userId) }
		};

		UserModel.destroy(condition)
			.then(() => {
				res.redirect("/users/admin/list");
			})
			.catch(function(err) {
				res.status(err.status || 500);
				res.render('error');
			});
	}
}

module.exports = new AdminController();