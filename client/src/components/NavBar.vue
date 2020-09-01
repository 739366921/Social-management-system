<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand text-light" to="/">前端羊仔</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
           <router-link class="nav-link" to="/profiles">所有用户</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link v-show="isLogin" class="nav-link" to="/feed">发表动态</router-link>
          </li>
          <li class="nav-item">
            <router-link v-show="isLogin" class="nav-link" to="/dashboard">我的</router-link>
          </li>
          <li class="nav-item">
            <router-link v-show="!isLogin" class="nav-link" to="/register">注册</router-link>
          </li>
          <li class="nav-item">
            <router-link v-show="!isLogin" class="nav-link" to="/login">登录</router-link>
          </li>
          <li class="nav-item" v-if="user!=null">
            <a @click.prevent="logOut" v-show="isLogin" class="nav-link">
              <img :src="user.avatar" :alt="user.name" class="rounded-circle headerImg" />
              退出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  computed: {
    isLogin() {
      if (this.$store.getters.isAuthenticated) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    logOut() {
      //删除token
      localStorage.removeItem("jwtToken");
      //干掉请求头
      // this.$store.dispatch("setIsAuthenticated", false);
      // this.$store.dispatch("setUser", {});
      this.$store.dispatch("clearCurrentState");
      //页面跳转
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}
.headerImg {
  width: 30px;
  margin-right: 5px;
}
</style>
