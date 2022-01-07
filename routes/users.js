const express = require('express');
const router = express.Router();

const Loader = require('./../core/Loader');
const adminController = Loader.controller('user', 'admin');
const defaultController = Loader.controller('user', 'default');

const Authenticate = require('../middlewares/Authenticate');
const VerifyAdmin = require('../middlewares/VerifyAdmin');

/**
 *  Admin
 **/
router.all('/admin/list', VerifyAdmin, adminController.list);
router.all('/admin/add', VerifyAdmin,adminController.add);
router.all('/admin/update/:userId', VerifyAdmin,adminController.update);
router.all('/admin/delete/:userId', VerifyAdmin,adminController.delete);


/**
 * User
 **/
router.get('/personal', Authenticate, defaultController.personal);
router.all('/reset-password', Authenticate, defaultController.resetPassword);
router.all('/recovery-password', defaultController.recoveryPassword);


module.exports = router;