const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');

/**
 * Custom route.
 **/
const defaultController = Loader.loadController('orders', 'default')
router.get('/', defaultController.index);

/**
 * Admin route.
 **/
const adminController = Loader.loadController('orders', 'admin');
router.get('/admin/list', adminController.list);


module.exports = router;