import axios from 'axios';
import urls from '../constants/url';
import {get,post} from '../../../common/request'
 
axios.defaults.timeout = 60 * 1000 * 5; //响应超时时间          
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; //配置请求头
const isDev = process.env.NODE_ENV === 'development';
if(isDev) {
    axios.defaults.baseURL = urls.testBaseUrl.url;  //配置接口地址
} else {
    axios.defaults.baseURL = urls.baseUrl.url;   //配置接口地址
}
//请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
export default {
    post:post,
    get:get 
}