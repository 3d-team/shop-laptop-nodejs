const bcrypt = require('bcrypt');

const config = require('./../../../config/config');
const Loader = require("./../../../core/Loader");
const Utils = Loader.core('Utils');
const UserModel = Loader.model('user');

class DefaultController {

	register(req, res){
		res.render('register', {
			layout: null,
			message: req.flash('message'),
			error: req.flash('error')
		});
	}

	async confirm(req, res) {
		const confirmCode = String(req.params.code);

		const condition = {
			status: 0,
			confirm_code: confirmCode
		};

		const user = await UserModel.findOne(condition);
		if (!user) {
			return res.status(404).send("Không tìm thấy tài khoản.");
		}

		user.status = 1;
		await user.save();

		return res.status(200).send("Kích hoạt thành công. Mời đăng nhập!");
	}

	login(req, res){		
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
		const user = await UserModel.findOne({where: {id: req.user.id}});
		
		res.render('personal', {
			layout: 'admin',
			data: user
		});
	}

	async recoveryPassword(req, res) {
		if (req.method == "POST") {
			const condition = {
				where: {
					status: 1,
					email: req.body.email
				}
			};

			const account = await UserModel.findOne(condition);
			if (!account) {
				req.flash('error', 'Email không tồn tại.');
			} else {
				const newPassword = Utils.generatePassword();
				const data = {
					password: bcrypt.hashSync(newPassword, 8)
				}

				await UserModel.update(data, condition).then((result) => {
					req.flash('message', "Cập nhật mật khẩu thành công. Mời kiểm tra email!");

					const mailService = req.app.get('context').make('mailService');
					mailService.sendRecoveryEmail(req.body.email, newPassword);
				})
			}
		}

		res.render("recovery-password", {
			layout: null,
			message: req.flash('message'),
			error: req.flash('error')
		})
	}

	async resetPassword(req, res) {
		if (req.method == "POST") {

			const condition = {
				where: {
					id: req.user.id,
					status: 1
				}
			};

			const account = await UserModel.findOne(condition);
			const isPasswordValid = bcrypt.compareSync(req.body.oldPassword, account.password);
            if (!isPasswordValid){
                req.flash("error", "Sai mật khẩu.");
            } else {
            	const newPassword = req.body.newPassword;
				const confirmPassword = req.body.confirmPassword;
				if (newPassword != confirmPassword) {
					req.flash("error", "Xác nhận mật khẩu không đúng.");
				} else {
					const data = {
						password: bcrypt.hashSync(newPassword, 8)
					};

					await UserModel.update(data, condition).then((result) => {
						req.logout();

						req.flash("message", "Đổi mật khẩu thành công. Mời đăng nhập lại!");
						return res.redirect("/login");
					});
				}
            }
		}

		res.render("reset-password", {
			layout: 'admin',
			message: req.flash("message"),
			error: req.flash("error")
		});
	}
}

module.exports = new DefaultController();