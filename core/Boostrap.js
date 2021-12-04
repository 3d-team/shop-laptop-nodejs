const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const hbs = require('hbs');

const config = require("../config/config");
const sequelize = require('./../config/database');
const Utils = require('./Utils');

const app = express();


/**
 * View engine
 * 
 * Initial default and view template.
 */
function viewEngine(app) {
	let views = [];
	fs.readdirSync(path.join(config.MODULE_DIR)).forEach(function(file){
		views.push(path.join(config.MODULE_DIR, file, "views/default"));
		views.push(path.join(config.MODULE_DIR, file, "views/admin"));
	});
	app.set('views', [
		...views,
		path.join(__dirname, '../views'),
		path.join(__dirname, '../views/layouts/default'),
		path.join(__dirname, '../views/layouts/admin')
	]);
	app.set('view engine', 'hbs');
	hbs.registerPartials(path.join(__dirname, '../views/layouts/default/partials'));
	hbs.registerPartials(path.join(__dirname, '../views/layouts/admin/partials'));
	app.engine('hbs', hbs.__express);
}


/**
 * Middleware
 * 
 * Set up default and custom middlewares.
 **/
const template = require("../middlewares/TemplateMiddleware");
const verifyAdmin = require("../middlewares/VerifyAdmin");

function registerMiddleware(app) {
	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '../public')));

	/* Custom */
	app.use("/*", template);
}


/**
 * Routing
 * 
 * Register route for app.
 */
function registerRoute(app) {

	app.use('/', require('../routes/home'));

	/* Custom route */
	fs.readdirSync(path.join(config.ROUTE_DIR)).forEach(function(file) {
		const route = Utils.convertToPath(file);
		const router = require(path.join(config.ROUTE_DIR, file));

		app.use(route, router);
	});
}


/**
 * Error handler
 * 
 * Handling for invalid route.
 **/
function registerHandler(app) {
	app.use(function(req, res, next) {
		next(createError(404));
	});

	app.use(function(err, req, res, next) {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		res.status(err.status || 500);
		res.render('error');
	});
}


module.exports = {
	viewEngine,
	registerMiddleware,
	registerRoute,
	registerHandler
}