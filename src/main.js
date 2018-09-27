import Vue from "vue";
import ElementUI from 'element-ui';
import App from "./App.vue";
import router from "./router";
import axios from 'axios';

import '../public/iconfont'
import 'element-ui/lib/theme-chalk/index.css';
import '../public/iconfont.css'

Vue.use(ElementUI);

axios.defaults.baseURL = "http://localhost"
axios.defaults.withCredentials = true

Vue.prototype.axios = axios
Vue.prototype.baseUrl = 'http://localhost'
const TITLE = "火车售票-"

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = TITLE + to.meta.title
    }
    next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
