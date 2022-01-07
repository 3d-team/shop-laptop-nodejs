const VerifyActivate = require('./VerifyActivate');

const Authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return VerifyActivate(req, res, next);
  }

  res.redirect('/login');
  res.end();
};

module.exports = Authenticate;