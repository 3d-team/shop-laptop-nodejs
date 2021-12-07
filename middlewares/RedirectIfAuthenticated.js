const config = require('./../config/config');
const jwt = require("jsonwebtoken");

const RedirectIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(403).redirect('/users/personal');
  }

  return next();
};

module.exports = RedirectIfAuthenticated;