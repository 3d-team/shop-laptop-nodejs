const bcrypt = require('bcrypt');
const Loader = require("./../../../core/Loader");
const Utils = Loader.core('Utils');
const UserModel = Loader.model('user');

class DefaultController {

	register(req, res) {
		res.render('register', {
			layout: null,
			message: req.flash('message'),
			error: req.flash('error')
		});
	}

	async confirm(req, res) {
		const confirmCode = String(req.params.code);

		const condition = {
			where: {
				status: 0,
				confirm_code: confirmCode
			}
		};

		const user = await UserModel.findOne(condition);
		if (!user) {
			return res.status(404).send("Không tìm thấy tài khoản.");
		}

		user.status = 1;
		await user.save();

		return res.status(200).send("Kích hoạt thành công. Mời đăng nhập!");
	}

	login(req, res) {
		res.render('login', {
			layout: null,
			message: req.flash('message'),
			error: req.flash('error')
		});
	}

	logout(req, res) {
		req.logout();
		return res.redirect('/login');
	}

	async personal(req, res) {

		const condition = { where: { id: req.user.id } };

		if (req.method == "POST") {
			const data = {
				username: req.body.username,
				email: req.body.email,
				address: req.body.address,
				phone: req.body.phone,
				avatar: req.body.avatar
			};

			await UserModel.update(data, condition);
		}

		const user = await UserModel.findOne(condition);

		res.render('personal', {
			layout: 'admin',
			data: user
		});
	}

	async recoveryPassword(req, res) {
		if (req.method == "POST") {
			const userService = req.app.get('context').make('userService');
			await userService.recoveryPassword(req);
		}

		res.render("recovery-password", {
			layout: null,
			message: req.flash('message'),
			error: req.flash('error')
		})
	}

	async resetPassword(req, res) {
		if (req.method == "POST") {
			const userService = req.app.get('context').make('userService');
			await userService.resetPassword(req, res);
		}

		res.render("reset-password", {
			layout: 'admin',
			message: req.flash("message"),
			error: req.flash("error")
		});
	}
}

module.exports = new DefaultController();