const bcrypt = require('bcrypt');
const Loader = require("./../core/Loader");
const Utils = Loader.core('Utils');
const UserModel = Loader.model('user');

class UserService {
	async recoveryPassword(request) {
		const condition = {
			where: {
				status: 1,
				email: request.body.email
			}
		};

		const account = await UserModel.findOne(condition);
		if (!account) {
			request.flash('error', 'Email không tồn tại.');
		} else {
			const newPassword = Utils.generatePassword();
			const data = {
				password: bcrypt.hashSync(newPassword, 8)
			}

			await UserModel.update(data, condition).then((result) => {
				request.flash('message', "Cập nhật mật khẩu thành công. Mời kiểm tra email!");

				const mailService = request.app.get('context').make('mailService');
				mailService.sendRecoveryEmail(request.body.email, newPassword);
			})
		}
	}

	async resetPassword(request, response) {
		const condition = {
			where: {
				id: request.user.id,
				status: 1
			}
		};

		const account = await UserModel.findOne(condition);
		const isPasswordValid = bcrypt.compareSync(request.body.oldPassword, account.password);
        if (!isPasswordValid){
            request.flash("error", "Sai mật khẩu.");
            return;
        }

    	const newPassword = request.body.newPassword;
		const confirmPassword = request.body.confirmPassword;
		if (newPassword != confirmPassword) {
			request.flash("error", "Xác nhận mật khẩu không đúng.");
			return;
		}

		const data = {
			password: bcrypt.hashSync(newPassword, 8)
		};
		await UserModel.update(data, condition).then((result) => {
			request.logout();
			request.flash("message", "Đổi mật khẩu thành công. Mời đăng nhập lại!");
			response.redirect("/login");
		});						
	}
}

module.exports = UserService;