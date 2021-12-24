const VerifyActivate = require('./VerifyActivate');

const Authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return VerifyActivate(req, res, next);
  }

  return res.redirect('/login');
};

module.exports = Authenticate;