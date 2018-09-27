import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import axios from 'axios'

Vue.use(ElementUI);

axios.defaults.baseURL = "http://localhost"
axios.defaults.withCredentials = true

Vue.prototype.axios = axios
Vue.prototype.baseUrl = 'http://localhost'
const TITLE = "第二商城-"

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
