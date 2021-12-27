const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const hbs = require('hbs');
const expressSession = require('express-session');
const flash = require('express-flash')
const passport = require('passport');
const cors = require('cors');

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
	hbs.registerHelper('standardPrice', function(price) {
		let priceStr = price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').toString();
	
		return priceStr.substr(0, priceStr.length - 3);
	})
	app.engine('hbs', hbs.__express);
}


/**
 * Middleware
 * 
 * Set up default and custom middlewares.
 **/
const Auth = require('./Auth');
const template = require("../middlewares/TemplateMiddleware");
const verifyAdmin = require("../middlewares/VerifyAdmin");

function registerMiddleware(app) {
	app.use(cors());
	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '../public')));
	app.use(expressSession({
		secret: config.APP_KEY,
		resave: false,
    	saveUninitialized: false
    }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	/* Custom */
	app.use("/*", template);

	app.use((req, res, next) => { //This middleware checks the local user
		res.locals.user = req.user
		next()
	  });
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