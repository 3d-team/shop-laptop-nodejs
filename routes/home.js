const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');
const defaultController = Loader.controller('home', 'default');
const adminController = Loader.controller('home', 'admin');

const userDefaultController = Loader.controller('user', 'default');

const Auth = require('./../core/Auth');
const Authenticate = require('../middlewares/Authenticate');
const RedirectIfAuthenticated = require('../middlewares/RedirectIfAuthenticated');
const VerifyAdmin = require('../middlewares/VerifyAdmin');


/**
 * Common route.
 * 
 **/
router.get('/register', RedirectIfAuthenticated, userDefaultController.register);
router.post('/register', Auth.authenticate('signup', {
    successRedirect: '/users/personal',
    failureRedirect: '/register',
    failureFlash : true 
}));

router.get('/login', RedirectIfAuthenticated, userDefaultController.login);
router.post('/login', Auth.authenticate('signin', { 
    successRedirect: '/', 
    failureRedirect: '/login', 
    failureFlash: true 
}));

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
router.get('/admin/statistics/bestseller', VerifyAdmin, adminController.bestseller);


module.exports = router;
