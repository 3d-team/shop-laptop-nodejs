const VerifyActivate = require('./VerifyActivate');

const VerifyAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.admin) {
		return VerifyActivate(req, res, next);
	}

	return res.send("403 Not Forbidden - Yêu cầu quyền truy cập vào tài nguyên này.");
};

module.exports = VerifyAdmin;