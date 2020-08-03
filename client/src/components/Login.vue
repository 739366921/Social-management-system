<template>
  <!-- Login-->
  <div class="Login">
    <div class="box">
      <div class="content m-auto col-lg-11">
        <h1 class="display-5 text-center ">登陆</h1>
        <p class="lead text-center">使用已有的账户登录</p>
        <form @submit.prevent="submit" autocomplete="off" method="post">
          <div class="form-group">
            <input
              type="email"
              name="email"
              placeholder="邮箱地址"
              class="form-control form-control-lg"
              v-model="user.email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              placeholder="密码"
              class="form-control form-control-lg"
              v-model="user.password"
            />
          </div>
          <input type="submit" class="btn btn-info btn-block mt-4 mb-4" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      console.log(this.user.email);
      console.log(this.user.password);
    }
  }
};
</script>

<style scoped>
.Login {
  display: flex;
  background: url("../assets/home_page.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
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
