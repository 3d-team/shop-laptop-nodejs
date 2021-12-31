const config = require('./../config/config');
const jwt = require("jsonwebtoken");

const RedirectIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.status != 1) {
      return res.send("Kiểm tra gmail và kích hoạt tài khoản.");
    }
    
    res.status(403).redirect('/users/personal');
  }

  return next();
};

module.exports = RedirectIfAuthenticated;