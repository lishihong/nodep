var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
    res.send('user-login');
})


module.exports = router;   //暴露这个 router模块