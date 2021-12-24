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

	async confirm(req, res) {
		const confirmCode = req.params.code;

		const condition = {
			status: 0,
			confirm_code: confirmCode
		};

		const user = await UserModel.findOne(condition);
		if (!user) {
			return res.status(404).send({message: "Không tìm thấy tài khoản."});
		}

		user.status = 1;
		await user.save();

		return res.status(200).send({message: "Kích hoạt thành công. Mời đăng nhập!"});
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