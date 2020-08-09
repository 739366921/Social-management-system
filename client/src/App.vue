<template>
  <div id="app">
    <div class="home_page">
      <NavBar id="home_page_NavBar" />
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <Footer id="home_page_Footer" />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  components: {
    NavBar,
    Landing,
    Footer,
  },
  created() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      //分发actions
      this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
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
.home_page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
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
