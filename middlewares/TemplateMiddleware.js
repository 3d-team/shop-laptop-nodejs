module.exports = function(req, res, next) {
	if (req.baseUrl.includes('admin') || req.baseUrl.indexOf('admin') != -1) {
		req.app.locals.layout = 'admin';
	} else {
		req.app.locals.layout = 'default';
	}
	
    next();
};