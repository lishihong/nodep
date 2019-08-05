require('./api/config/db')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //body-parser中间件来解析请求体
var session = require('express-session');
const router = require('./api/routes/index')
const express = require('express')
const app = express()

app.use(bodyParser.json());
app.use(cookieParser('sessionnodep'));
app.set('trust proxy', 1)
app.use(session({
    name:'token',
    secret: 'sessionnodep', //与cookieParser中的一致
    resave: true, //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
    rolling: true, //强制在每个响应中重设cookie的过期时间，并重新开始计时
    saveUninitialized: true, //初始化session时是否保存到存储。默认为true
    cookie: {
        maxAge: 60 * 1000 //过期时间，单位毫秒
    }
}));

/**
 * 资源请求拦截器
 * 用户端若登录状态过期或未登录则自动抛出错误
 */
app.use(function(req, res, next) {
    req.session.touch(); //刷新session过期时间
    next();
})

app.use("/", router)
 
app.get('*', (req, res) => {
    res.json(req)
    res.send('404 not found')
})
 
app.listen(3000, function() {
    console.log('node服务端启动：localhost:3000')
})