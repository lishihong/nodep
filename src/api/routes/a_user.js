var express = require('express');
var router = express.Router();
let Result = require("../../entity/Result")
let AUserTable = require('../model/AUserTable')

router.post('/login', function(req, res) {
    try{
        let {username,password} = req.body
        req.session.userId = username
        AUserTable.find(username).then(res=>{
            if(!res) {
                AUserTable.insert(username, password)
            }
        })
        res.json(new Result('登录成功', '200'))
    } catch (e) {
        res.json(new Result(e.message, '500'))
    }
})
router.post('/checkLogin', function(req, res) {
    if (req.session.userId) {
        res.json(new Result('已登录', '200', true))
    }else{
        res.json(new Result('未登录或登录失效', '200', false))
    }
})


module.exports = router; //暴露这个 router模块