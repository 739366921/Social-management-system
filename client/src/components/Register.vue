<template>
  <!-- Register -->
  <div class="register">
    <div class="box">
      <div class="m-auto col-lg-11">
        <h1 class="display-5 text-center mt-4">注册</h1>
        <p class="lead text-center">创建新的账户</p>
        <form @submit.prevent="submit" autocomplete="off" method="post">
          <TextField
            type="text"
            name="name"
            placeholder="用户名"
            v-model="newUser.name"
            :error="errors.name"
          />
          <TextField
            type="email"
            name="email"
            placeholder="邮箱地址"
            v-model="newUser.email"
            :error="errors.email"
            info="我们使用了gravatar全球公认头像, 如果需要有头像显示, 请使用在gravatar注册的邮箱"
          />
          <TextField
            type="password"
            name="password"
            placeholder="密码"
            v-model="newUser.password"
            :error="errors.password"
          />
          <TextField
            type="password"
            name="password2"
            placeholder="确认密码"
            v-model="newUser.password2"
            :error="errors.password2"
          />
          <input type="submit" class="btn btn-info btn-block mt-4 mb-4" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "./common/TextFieldGroup";
export default {
  name: "Register",
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
      errors: "",
    };
  },
  components: {
    TextField,
  },
  methods: {
    submit() {
      // console.log(this.newUser.name);
      // console.log(this.newUser.email);
      // console.log(this.newUser.password);
      // console.log(this.newUser.password2);
      // console.log(this.$store.getters.isAuthenticated);
      // console.log(this.newUser)
      this.$axios
        .post("api/user/register", this.newUser)
        .then((res) => {
          // console.log(res.data);

          //进行mutations操作(同步)
          // this.$store.commit('setUser',res.data)

          //进行actions异步操作分发
          this.$store.dispatch("setUser", res.data);

          //成功后页面跳转
          this.$router.push("/login");
        })
        .catch((err) => {
          if (err.response.data) {
            this.errors = err.response.data; //要加response才会返回错误对象
          }
        });
    },
  },
};
</script>

<style scoped>
.register {
  display: flex;
  background: url("../assets/home_page.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.box {
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.9);
}
@media (max-width: 767px) {
  .box {
    margin: 10px;
  }
}
</style>