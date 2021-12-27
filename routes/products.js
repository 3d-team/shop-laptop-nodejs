const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');
const adminController = Loader.controller('product', 'admin');
const defaultController = Loader.controller('product', 'default');
const VerifyAdmin = require('../middlewares/VerifyAdmin');

/**
 * Admin 
 * Routing for dashboard.
 **/
router.get('/admin/', VerifyAdmin, adminController.index);
router.get('/admin/list/', VerifyAdmin, adminController.list);
router.get('/admin/list/:page', VerifyAdmin, adminController.list);
router.all('/admin/add', VerifyAdmin, adminController.add);
router.all('/admin/update/:productId', VerifyAdmin, adminController.update);
router.all('/admin/delete/:productId', VerifyAdmin, adminController.delete);
router.get('/admin/search', VerifyAdmin, adminController.search);
router.get('/admin/category', VerifyAdmin, adminController.listCategory);
router.get('/admin/category/add', VerifyAdmin, adminController.addCategory);
router.get('/admin/category/update', VerifyAdmin, adminController.updateCategory);

/**
 * Default
 * Routing for primary client.
 **/
router.get('/', defaultController.index);
router.get('/search', defaultController.search);
router.get('/detail/:productId', defaultController.detail);
router.post('/detail/:productId/comment', defaultController.comment);
router.get('/detail/:productId/getComment', defaultController.getComment);


module.exports = router;