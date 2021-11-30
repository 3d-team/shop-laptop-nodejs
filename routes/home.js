const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');

const defaultController = Loader.loadController('home', 'default');
router.get('/', defaultController.index);
router.get('/about', defaultController.about);
router.get('/contact', defaultController.contact);

const adminController = Loader.loadController('home', 'admin');
router.get('/admin', adminController.index);
router.get('/admin/statistics/revenue', adminController.revenue);
router.get('/admin/statistics/bestseller', adminController.bestseller);

module.exports = router;
