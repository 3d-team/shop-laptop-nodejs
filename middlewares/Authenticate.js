const config = require('./../config/config');
const Authorize = require('./Authorize');
const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(403).redirect('/login');
  }

  try {
    const data = jwt.verify(token, config.APP_KEY);

    return Authorize(req, res, next);
  } catch {
    return res.status(403).redirect('/login');
  }
};

module.exports = Authenticate;