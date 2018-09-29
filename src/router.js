import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index";
import Login from "./views/Login";
import Register from "./views/Register";
import MaIndex from "./views/manager/MaIndex";
import MaLogin from "./views/manager/MaLogin";
import MaUser from "./views/manager/MaUser";

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
          children: [
              {
                  path: "/maUser",
                  name: "maUser",
                  component: MaUser,
                  meta: {
                      title: '用户管理'
                  },
              },
          ]
      },
      {
          path: "/maLogin",
          name: "maLogin",
          component: MaLogin,
          meta: {
              title: '后台登录'
          },
      }
  ]
});
