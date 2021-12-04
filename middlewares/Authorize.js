const config = require('./../config/config');
const jwt = require("jsonwebtoken");

const Authorize = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    const data = jwt.verify(token, config.APP_KEY);
    req.userId = data.id;
    req.admin = data.admin;
    res.locals.isAdmin = data.admin;
  }

  return next();
};

module.exports = Authorize;