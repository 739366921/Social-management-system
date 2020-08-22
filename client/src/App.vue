<template>
  <div id="app">
    <div class="home_page">
      <NavBar id="home_page_NavBar" />
      <div class="home_page_Landing">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <Footer id="home_page_Footer" />
      <Loading v-show="loading" />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import jwt_decode from "jwt-decode";
import Loading from "./components/common/Loading";
export default {
  name: "App",
  components: {
    NavBar,
    Landing,
    Footer,
    Loading,
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);

      //获取当前时间
      const currentTime = Date.now() / 1000;

      //检测token是否过期
      if (decoded.exp < currentTime) {
        // this.$store.dispatch("setIsAuthenticated", false);
        // this.$store.dispatch("setUser", {});
        this.$store.dispatch("clearCurrentState");
        this.$router.push("/login");
      } else {
        //分发actions
        this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded));
        this.$store.dispatch("setUser", decoded);
      }
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === "undefined" ||
        value === "null" ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>

<style>
html {
  width: 100%;
}
body {
  width: 100%;
}
.home_page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.home_page_NavBar {
  align-items: flex-start;
}

.home_page_Landing {
  flex: 1;
}

.home_page_Footer {
  align-items: flex-end;
}
</style>
