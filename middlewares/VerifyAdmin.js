const config = require('./../config/config');
const Authorize = require('./Authorize');
const jwt = require("jsonwebtoken");

const VerifyAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.admin) {
		res.locals.isAdmin = req.user.admin;
	    return next();
	  } else {
	    return res.send("403 Not Forbidden - Yêu cầu quyền truy cập vào tài nguyên này.");
	  }
};

module.exports = VerifyAdmin;