const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');

/**
 *  Admin route.
 **/
const adminController = Loader.loadController('user', 'admin');
router.get('/admin/list', adminController.list);
router.get('/admin/add', adminController.add);
router.get('/admin/update', adminController.update);

module.exports = router;