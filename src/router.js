import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index";
import Login from "./views/Login";
import Register from "./views/Register"
import MaIndex from "./views/manager/MaIndex"

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: "/",
          name: "index",
          component: Index,
          meta: {
              title: '首页'
          },
      },
      {
          path: "/login",
          name: "login",
          component: Login,
          meta: {
              title: '用户登录'
          },
      },
      {
          path: "/register",
          name: "register",
          component: Register,
          meta: {
              title: '用户注册'
          },
      },
      {
          path: "/maIndex",
          name: "maIndex",
          component: MaIndex,
          meta: {
              title: '后台管理'
          },
      }
  ]
});
