const express = require('express');
const router = express.Router();

/**
 * Admin 
 * Routing for dashboard
 **/
const adminController = require("../modules/product/controllers/AdminController.js");
router.get('/admin/', adminController.index);
router.get('/admin/index/:page', adminController.index);
router.get('/admin/list', adminController.list);
router.all('/admin/add', adminController.add);
router.all('/admin/update/:productId', adminController.update);
router.all('/admin/delete/:productId', adminController.delete);
router.get('/admin/search', adminController.search);

router.get('/admin/category', adminController.listCategory);
router.get('/admin/category/add', adminController.addCategory);
router.get('/admin/category/update', adminController.updateCategory);

/**
 * Default
 * Routing for primary client 
 **/
const defaultController = require("../modules/product/controllers/DefaultController.js");
router.get('/', defaultController.index);
router.get('/:page', defaultController.index);
router.get('/detail/:productId', defaultController.detail);

module.exports = router;