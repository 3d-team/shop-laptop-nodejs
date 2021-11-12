const express = require('express');
const router = express.Router();

const defaultController = require("../modules/product/controllers/DefaultController.js");
const adminController = require("../modules/product/controllers/AdminController.js");

router.get('/', defaultController.index);
router.get('/admin', adminController.index);

module.exports = router;