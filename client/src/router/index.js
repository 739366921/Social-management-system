import Vue from "vue";
import Router from "vue-router";
import CreateProfile from "../components/CreateProfile.vue";
import Dashboard from "../components/Dashboard.vue";
import Landing from "../components/Landing.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

Vue.use(Router);

const route = new Router({
  mode: "history",
  linkActiveClass: "active",
  routes: [
    { path: "*", redirect: "/" },
    { path: "/", component: Landing },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/dashboard", component: Dashboard },
    { path: "/create-profile", component: CreateProfile }
  ]
});

//配置全局守卫
route.beforeEach((to, from, next) => {
  //获取存在localStoreage里面的token
  const isLogin = localStorage.jwtToken ? true : false;

  if (to.path == "/login" || to.path == "/register" || to.path == "/") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default route;
