    
import Vue from 'vue';
import Router from 'vue-router';
import config from '../constants/url'


Vue.use(Router);

const Home = () => import ("@pages/admin-page/views/home.vue")
const Login = () => import("@pages/admin-page/views/login.vue")
let adminFix = config.adminFix.value
let routes = [
    {
        path:'*',
        redirect:'/home'
    },
    {
        path:'/',
        redirect:'/home'
    },
    {
        path: '/home',
        name:'home',
        component: Home,
        meta:{"title":"首页"}
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            "title": "登录"
        }
    },
]
routes.map((item,index)=>{
    if(item.redirect) {
        let redirectTemp = `${adminFix}${item.redirect}`
        item.redirect = redirectTemp
    }
    if(index > 1) {
        if (item.path) {
            let pathTemp = `${adminFix}${item.path}`
            item.path = pathTemp
        }
    }
    return item
})
export default new Router({
    mode:'history',
    routes:routes,
})