const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const config = require('./../../../config/config');
const Loader = require("./../../../core/Loader");
const UserModel = Loader.model('user');

class DefaultController {

	async register(req, res){
		let message = '';

		if (req.method == "POST") {
			let data = {
				username: req.body.username,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8),
				address: req.body.address,
				phone: req.body.phone
			};

			const condition = {
				where: {email: data.email}
			};

			const account = await UserModel.findOne(condition);
			if (account == null) {
				UserModel.create(data).then(() => {
					res.redirect('/users/login');
				});
				return;
			} else {
				message = 'Email đã tồn tại.';
			}
		};

		res.render('register', {
			layout: null,
			message: message
		});
	}

	async login(req, res){
		let message = '';

		if (req.method == "POST") {
			let data = {
				email: req.body.email,
				password: req.body.password
			};

			const condition = {
				where: {
					email: data.email
				}
			};

			const account = await UserModel.findOne(condition);
			if (account != null) {
				const isPasswordValid = bcrypt.compareSync(data.password, account.password);
				if (!isPasswordValid) {
					message = 'Đăng nhập không thành công.';
				} else {
					const token = jwt.sign({ id: account.id, admin: account.admin }, config.APP_KEY);
					
					return res
						.cookie("access_token", token, {
					      httpOnly: true,
					      secure: process.env.NODE_ENV === "production",
					    })
					    .status(200)
					    .redirect('/users/personal');
				}
			} else {
				message = 'Đăng nhập không thành công.';
			}
		}

		res.render('login', {
			layout: null,
			message: message
		});
	}

	logout(req, res) {
		return res
			.clearCookie("access_token")
			.redirect('/');
	}

	personal(req, res) {
		const layout = 'admin';

		const condition = {
			where: {id: req.userId}
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