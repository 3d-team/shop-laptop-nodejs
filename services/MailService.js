const nodemailer = require("nodemailer");

class MailService {
	constructor() {
		this.transport = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: "3dteamkhtn@gmail.com",
				pass: "3Dteamshoplaptop@nodejs"
			}
		});
	}

	sendConfirmationEmail(name, email, confirmationCode) {
		this.transport.sendMail({
			from: "3dteamkhtn@gmail.com",
			to: email,
			subject: "Please confirm your account",
			html: `<h1>Email Confirmation</h1>
				<h2>Hello ${name}</h2>
				<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
				<a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
				</div>`,
		}).catch(err => console.log(err));
	};

	sendRecoveryEmail(email, newPassword) {
		this.transport.sendMail({
			from: "3dteamkhtn@gmail.com",
			to: email,
			subject: "New password - 3D Shop Laptop",
			html: `<h1>Password Recovery</h1>
				<h2>Hello client</h2>
				<p>Thank you for subscribing. Here's your new password: ${newPassword}</p>`,
		}).catch(err => console.log(err));
	};
}

module.exports = new MailService();