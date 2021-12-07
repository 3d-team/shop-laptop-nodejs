const config = require('./../config/config');
const Authorize = require('./Authorize');
const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isAdmin = req.user.admin;
    return next();
  } else {
    return res.redirect('/login');
  }
};

module.exports = Authenticate;