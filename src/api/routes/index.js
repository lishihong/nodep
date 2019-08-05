var express = require('express');
var router = express.Router();

router.use('/a/user', require('./a_user'));
router.use('/user', require('./user'));

module.exports = router