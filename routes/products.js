const express = require('express');
const router = express.Router();

const defaultController = require("../modules/product/controllers/DefaultController.js");
const adminController = require("../modules/product/controllers/AdminController.js");

router.get('/', defaultController.index);
router.get('/:productId', defaultController.detail);
//router.get('/admin', adminController.index);
router.get('/admin/category', adminController.listCategory);
router.get('/admin/category/add', adminController.addCategory);
router.get('/admin/category/update', adminController.updateCategory);
router.get('/admin/list', adminController.list);
router.get('/admin/add', adminController.add);
router.get('/admin/update', adminController.update);

module.exports = router;