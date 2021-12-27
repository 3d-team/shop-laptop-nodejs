const VerifyActivate = require('./VerifyActivate');

const VerifyAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.admin) {
		return VerifyActivate(req, res, next);
	}

	res.send("403 Not Forbidden - Yêu cầu quyền truy cập vào tài nguyên này.");
	res.end();
};

module.exports = VerifyAdmin;