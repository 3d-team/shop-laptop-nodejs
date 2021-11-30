const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');

/**
 * Admin 
 * Routing for dashboard.
 **/
const adminController = Loader.loadController('product', 'admin');
router.get('/admin/', adminController.index);
router.get('/admin/list/', adminController.list);
router.get('/admin/list/:page', adminController.list);
router.all('/admin/add', adminController.add);
router.all('/admin/update/:productId', adminController.update);
router.all('/admin/delete/:productId', adminController.delete);
router.get('/admin/search', adminController.search);

router.get('/admin/category', adminController.listCategory);
router.get('/admin/category/add', adminController.addCategory);
router.get('/admin/category/update', adminController.updateCategory);

/**
 * Default
 * Routing for primary client.
 **/
const defaultController = Loader.loadController('product', 'default');
router.get('/', defaultController.index);
router.get('/:page', defaultController.index);
router.get('/detail/:productId', defaultController.detail);


module.exports = router;