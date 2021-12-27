const Authorize = (req, res, next) => {

  if (req.isAuthenticated()) {
    res.locals.isAdmin = req.user.admin;
    res.locals.user = req.user;
  }

  return next();
};

module.exports = Authorize;