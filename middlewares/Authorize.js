const Authorize = (req, res, next) => {

  if (req.isAuthenticated()) {
    res.locals.isAdmin = req.user.admin;
  }

  return next();
};

module.exports = Authorize;