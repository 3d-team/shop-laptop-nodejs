const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');
const defaultController = Loader.controller('home', 'default');
const adminController = Loader.controller('home', 'admin');

const userDefaultController = Loader.controller('user', 'default');

const Authenticate = require('../middlewares/Authenticate');
const RedirectIfAuthenticated = require('../middlewares/RedirectIfAuthenticated');
const VerifyAdmin = require('../middlewares/VerifyAdmin');

/**
 * Common route.
 * 
 **/

/* Register */
router.get('/register', RedirectIfAuthenticated, userDefaultController.register);
router.post('/register', function(req, res, next) {
    const authService = req.app.get('context').make('authService');

    authService.authenticate('signup', {
        successRedirect: '/login',
        failureRedirect: '/register',
        failureFlash : true 
    })(req, res, next);
});

/* Activate account */
router.get('/confirm/:code', userDefaultController.confirm);

/* Login */
router.get('/login', RedirectIfAuthenticated, userDefaultController.login);
router.post('/login', function(req, res, next) {
    const authService = req.app.get('context').make('authService');

    authService.authenticate('signin', {
        successRedirect: 'back',
        failureRedirect: '/login', 
        failureFlash: true 
    })(req, res, next);
});

/* Logout */
router.get('/logout', userDefaultController.logout);

/**
 * User. 
 **/
router.get('/', defaultController.index);
router.get('/about', defaultController.about);
router.get('/contact', defaultController.contact);


/**
 * Admin. 
 **/
router.get('/admin', VerifyAdmin, adminController.index);
router.get('/admin/statistics/revenue', VerifyAdmin, adminController.revenue);
router.post('/admin/statistics/getRevenueData', adminController.getRevenueData);
router.get('/admin/statistics/bestseller', VerifyAdmin, adminController.bestseller);


module.exports = router;
