const config = require('./../config/config');
const jwt = require("jsonwebtoken");

const RedirectIfAuthenticated = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    res.status(403).redirect('/users/personal');
  }

  return next();
};

module.exports = RedirectIfAuthenticated;