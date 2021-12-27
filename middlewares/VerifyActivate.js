const Authorize = require('./Authorize');

const VerifyActivate = (req, res, next) => {
  if (req.user.status == 1) {
    return Authorize(req, res, next);
  }
   
  res.send("Kiểm tra gmail và kích hoạt tài khoản.");
  res.end();
};

module.exports = VerifyActivate;