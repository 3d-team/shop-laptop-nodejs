var express = require('express');
var router = express.Router();

const defaultController = require("../modules/home/controllers/DefaultController.js");
const adminController = require("../modules/home/controllers/AdminController.js");

router.get('/', defaultController.index);
router.get('/admin', adminController.index);

module.exports = router;
