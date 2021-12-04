const config = require('./../config/config');
const Authorize = require('./Authorize');
const jwt = require("jsonwebtoken");

const VerifyAdmin = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		res.redirect('/login');
	}

	try {
		const data = jwt.verify(token, config.APP_KEY);

		if (!data.admin) {
			res.status(403).render('error', {
				message: "Không có quyền truy cập.",
				error: {
					status: 403
				}
			});
		}

		return Authorize(req, res, next);
	} catch {
		return res.redirect('/login');
	}
};

module.exports = VerifyAdmin;