const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');
const defaultController = Loader.controller('orders', 'default');
const adminController = Loader.controller('orders', 'admin');

const Authenticate = require('../middlewares/Authenticate');
const VerifyAdmin = require('../middlewares/VerifyAdmin');

/**
 * Custom route.
 **/
router.get('/', defaultController.index);
router.post('/add', defaultController.add);
router.post('/changeNumberItem', defaultController.changeNumberItem);
router.post('/remove', defaultController.remove);
router.post('/submit', defaultController.submit);
router.post('/destroy', defaultController.destroy);
router.get('/cart', Authenticate, defaultController.cart);
router.get('/list', Authenticate, defaultController.list);


/**
 * Admin route.
 **/
router.get('/admin/list', VerifyAdmin, adminController.list);


module.exports = router;