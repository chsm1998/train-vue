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

axios.interceptors.response.use(res => {
    if (res.data.status === 500 || res.data.status === 400) {
        message(res.data.msg, 'error')
    }
    console.log(res.data.status)
    if (res.data.status === 300) {
        router.push("/login")
    }
    if (res.data.status === 301) {
        router.push("/maLogin")
    }
    return res
})

Vue.prototype.axios = axios
Vue.prototype.$myGet = function (url, method, params) {
    axios.get(url, {
        params: params
    })
        .then(res => {
            if (res.data.status === 200) {
                message(res.data.msg, 'success')
                if (method != null) {
                    method(res)
                }
            }
        })
        .catch(error => {
            console.log(error)
            message('服务端响应异常', 'error')
        })
}
Vue.prototype.$myPost = function (url, method, params) {
    axios.post(url, params)
        .then(res => {
            if (res.data.status === 200) {
                message(res.data.msg, 'success')
                if (method != null) {
                    method(res)
                }
            }
        })
        .catch(error => {
            console.log(error)
            message('服务端响应异常', 'error')
        })
}
Vue.prototype.$myPut = function (url, method, params) {
    axios.put(url, params)
        .then(res => {
            if (res.data.status === 200) {
                if (res.data.status === 200) {
                    message(res.data.msg, 'success')
                    method(res)
                }
            }
        })
        .catch(error => {
            console.log(error)
            console.log(error)
            message('服务端响应异常', 'error')
        })
}
Vue.prototype.$myDelete = function (url, method, params) {
    axios.delete(url, params)
        .then(res => {
            if (res.data.status === 200) {
                message(res.data.msg, 'success')
                if (method != null) {
                    method(res)
                }
            }
        })
        .catch(error => {
            console.log(error)
            message('服务端响应异常', 'error')
        })
}
Vue.prototype.baseUrl = 'http://localhost'
const TITLE = "火车售票-"

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = TITLE + to.meta.title
    }
    next()
})

let vm = new Vue({
    router,
    data: {
        user: null
    },
    render: h => h(App)
}).$mount("#app");

function message(msg, type) {
    vm.$message({
        showClose: true,
        message: msg,
        type: type
    })
}

Vue.prototype.$myMessage = function (msg, type) {
    message(msg, type)
}