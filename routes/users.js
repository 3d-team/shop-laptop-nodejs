const express = require('express');
const router = express.Router();

//const defaultController = require("../modules/users/controllers/DefaultController.js");
const adminController = require("../modules/user/controllers/AdminController.js");

//router.get('/', defaultController.index);
//router.get('/admin', adminController.index);
router.get('/admin/list', adminController.list);
router.get('/admin/add', adminController.add);
router.get('/admin/update', adminController.update);

module.exports = router;