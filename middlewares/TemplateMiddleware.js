module.exports = function(req, res, next) {
	req.app.locals.layout = 'default';
    next();
};