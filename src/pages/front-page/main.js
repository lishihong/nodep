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

const baseTitle = '权限管理系统设计-admin'

router.beforeEach((to,from,next) => {
    NProgress.start()
    document.title = `${baseTitle}-${to.meta.title}`;
    next()
})

router.afterEach(() => {
    NProgress.done()
})


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
