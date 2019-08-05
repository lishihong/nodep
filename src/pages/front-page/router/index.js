    
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () => import ("@pages/front-page/views/home.vue")
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
]
export default new Router({
    mode: 'history',
    routes:routes,
})