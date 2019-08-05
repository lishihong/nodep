import Vue from 'vue'
import App from './app.vue'
import router from './router'
import './assets/styles/theme.less'
import './services/directive'
import './services/filter'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import urls from './constants/url'
import requestUtil from './services/request'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.prototype.$filters = Vue.options.filters

Vue.use(ElementUI);

NProgress.configure({
    showSpinner: false
})

Vue.config.productionTip = false

Vue.prototype.router = router;
Vue.prototype.urls = urls;
Vue.prototype.requestUtil = requestUtil;

const whiteList = ['/a/login'] //不需要判断登录的路由
const baseTitle = '权限管理系统设计-admin'

router.beforeEach((to, from, next) => {
    NProgress.start()
    document.title = `${baseTitle}-${to.meta.title}`;
    requestUtil.post(urls.aCheckLogin.url).then((res) => {
        if (res.code == 200 && res.data) {
            if (to.path == '/a/login') {
                next({
                    path: '/'
                })
                NProgress.done()
            } else {
                next();
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next(`/a/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
    })
})
router.afterEach(() => {
    NProgress.done()
})


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
