import axios from 'axios';
import {Loading,Message} from 'element-ui';
 
//添加响应拦截器
axios.defaults.withCredentials = true;
axios.interceptors.response.use((res) =>{
    return Promise.resolve(res);
}, (error) => {
    if (error.response && error.response.data.result_msg) {
        //提示msg
        Message({message:error.response.data.result_msg,duration:2000,center:true,type:"warning"})
    }
    return Promise.reject(error)
})
function dealRequest(url,params,funName,isLoading) {
    return new Promise((resolve) => {
        //显示loading
        let loading;
        if(isLoading) {
            loading = Loading.service({
                lock: true,
                text: '努力加载中，请稍等...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
        axios[funName](url, params)
            .then(response => {
                if(isLoading) {
                    loading.close();
                }
                resolve(response.data);
            },(err)=>{
                console.log(err)
                if(isLoading) {
                    loading.close();
                }
            })
            .catch((err) => {
                console.log(err)
                if(isLoading) {
                    loading.close();
                }
            })
    })
}

//返回一个Promise(发送post请求)
function post(url, params,isLoading = true) {
    return dealRequest(url,params,"post",isLoading);
}
//返回一个Promise(发送get请求)
function get(url,params,isLoading = true) {
    return dealRequest(url,params,"get",isLoading);
}

export {
    post,
    get,
}