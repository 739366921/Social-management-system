<template>
  <!-- Login-->
  <div class="Login">
    <div class="box">
      <div class="content m-auto col-lg-11">
        <h1 class="display-5 text-center">登陆</h1>
        <p class="lead text-center">使用已有的账户登录</p>
        <form @submit.prevent="submit" autocomplete="off" method="post">
          <TextField
            type="email"
            name="email"
            placeholder="邮箱地址"
            v-model="user.email"
            :error="errors.email"
          />
          <TextField
            type="password"
            name="password"
            placeholder="密码"
            v-model="user.password"
            :error="errors.password"
          />
          <input type="submit" class="btn btn-info btn-block mt-4 mb-4" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import TextField from "./common/TextFieldGroup";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  components: {
    TextField,
  },
  methods: {
    submit() {
      // console.log(this.user.email);
      // console.log(this.user.password);
      this.$axios
        .post("/api/user/login", this.user)
        .then((res) => {
          const { token } = res.data;
          window.localStorage.setItem("jwtToken", token);

          //解析token
          const decoded = jwt_decode(token);

          //进行分发actions更改store的state
          this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded));
          this.$store.dispatch("setUser", decoded);

          this.errors = {};

          //页面跳转
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          if (err.response.data) {
            this.errors = err.response.data; //要加response才会返回错误对象
          }
        });
    },
    isEmpty(value) {
      return (
        value === "undefinded" ||
        value === "null" ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>

<style scoped>
.Login {
  display: flex;
  background: url("../assets/home_page.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 506.66px;
  height: 400px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.9);
}
@media (max-width: 767px) {
  .box {
    margin: 10px;
  }
}
</style>
