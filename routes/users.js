const express = require('express');
const router = express.Router();

//const defaultController = require("../modules/users/controllers/DefaultController.js");
const adminController = require("../modules/user/controllers/AdminController.js");
const defacultController = require("../modules/user/controllers/DefaultController.js");
//router.get('/', defaultController.index);
//router.get('/admin', adminController.index);
router.get('/admin/list', adminController.list);
router.get('/admin/add', adminController.add);
router.get('/admin/update', adminController.update);

// Default
router.get('/', defacultController.login);
router.get('/register', defacultController.register);

module.exports = router;