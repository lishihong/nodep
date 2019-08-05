export default {
    testBaseUrl:{url:"/api","desc":"测试环境配置跨域的"},//nginx配置跨域代理处理
    testBaseUrlNoProxy:{url:"http://10.74.20.65/api","desc":"测试环境"},
    baseUrl:{url:"http://localhost:5000/api","desc":"生产环境配置跨域的"},//nginx配置跨域代理处理
    baseUrlNoProxy:{url:"http://10.74.20.65/api","desc":"生产环境"},
}
