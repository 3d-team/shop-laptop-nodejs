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
const Utils = require('./Utils');
const template = require("./../middlewares/TemplateMiddleware");
const Authorize = require('../middlewares/Authorize');

/**
| --------------------------------
|	Bootstraping the application
| --------------------------------
| 
| The first thing we will do is set up all dependencies of application instance
| which serves as the "glue" for all the components of ExpressJS.
|
**/
class Bootstrap {
	constructor(app) {
		this.app = app;

		/* Singleton */
		if(!this.instance) {
			this.instance = this;
		}
		return this.instance;
	}

	/**
	 * @functional Booting required components of Express.
	 * @brief Inject view engine, middlewares, routes, error handler.  
	 **/
	booting() {
		this.viewEngine();
		this.registerMiddleware();
		this.registerRoute();
		this.registerHandler();
	}

	/**
	 * @brief Endpoint of process booting the application.
	 * @return Fulfil ExpressJS application.
	 **/
	start() {
		return this.app;
	}

	/**
	 * @functional Setup view engine.
	 * 
	 * @functional Make default, admin template based on route.
	 */
	viewEngine() {
		let views = [];
		fs.readdirSync(path.join(config.MODULE_DIR)).forEach(function(file){
			views.push(path.join(config.MODULE_DIR, file, "views/default"));
			views.push(path.join(config.MODULE_DIR, file, "views/admin"));
		});
		this.app.set('views', [
			...views,
			path.join(__dirname, '../views'),
			path.join(__dirname, '../views/layouts/default'),
			path.join(__dirname, '../views/layouts/admin')
		]);
		this.app.set('view engine', 'hbs');
		hbs.registerPartials(path.join(__dirname, '../views/layouts/default/partials'));
		hbs.registerPartials(path.join(__dirname, '../views/layouts/admin/partials'));
		hbs.registerHelper('standardPrice', function(price) {
			let priceStr = price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').toString();
		
			return priceStr.substr(0, priceStr.length - 3);
		})
		this.app.engine('hbs', hbs.__express);
	}

	/**
	 * @functional Middleware
	 * 
	 * @brief Set up default and custom middlewares.
	 **/
	registerMiddleware() {
		this.app.use(cors());
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(express.static(path.join(__dirname, '../public')));
		this.app.use(expressSession({
			secret: config.APP_KEY,
			resave: false,
			saveUninitialized: false
		}));
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		this.app.use(flash());

		/* Custom */
		this.app.use("/*", template, Authorize);

		this.app.locals.Cart = {
			number: 0,
			total_unit: 0,
			title: "cart",
			items: new Map()
		}
	}

	/**
	 * @functional Routing
	 * 
	 * @brief Register route for app.
	 */
	registerRoute() {
		this.app.use('/', require('../routes/home'));

		/* Custom route */
		const application = this;
		fs.readdirSync(path.join(config.ROUTE_DIR)).forEach(function(file) {
			const route = Utils.convertToPath(file);
			const router = require(path.join(config.ROUTE_DIR, file));

			application.app.use(route, router);
		});
	}

	/**
	 * @functional Error handler
	 * 
	 * @brief Handling for invalid route.
	 **/
	registerHandler() {
		this.app.use(function(req, res, next) {
			next(createError(404));
		});

		this.app.use(function(err, req, res, next) {
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};

			res.status(err.status || 500);
			res.render('error', {layout: 'default'});
		});
	}
}

module.exports = Bootstrap;