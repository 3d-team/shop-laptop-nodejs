const express = require('express');
const router = express.Router();

const defaultController = require("../modules/home/controllers/DefaultController.js");
const adminController = require("../modules/home/controllers/AdminController.js");

router.get('/', defaultController.index);
router.get('/about', defaultController.about);
router.get('/contact', defaultController.contact);
router.get('/admin', adminController.index);
router.get('/admin/statistics/revenue', adminController.revenue);
router.get('/admin/statistics/bestseller', adminController.bestseller);

module.exports = router;
