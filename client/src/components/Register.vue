<template>
  <!-- Register -->
  <div class="register">
    <div class="box">
      <div class="m-auto col-lg-11">
        <h1 class="display-5 text-center mt-4">注册</h1>
        <p class="lead text-center">创建新的账户</p>
        <form @submit.prevent="submit" autocomplete="off" method="post">
          <div class="form-group">
            <input
              type="text"
              name="name"
              placeholder="用户名"
              class="form-control form-control-lg"
              v-model="newUser.name"
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              name="email"
              placeholder="邮箱地址"
              class="form-control form-control-lg"
              v-model="newUser.email"
            />
            <div class="text-muted small">我们使用了gravatar全球公认头像, 如果需要有头像显示, 请使用在gravatar注册的邮箱</div>
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              placeholder="密码"
              class="form-control form-control-lg"
              v-model="newUser.password"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password2"
              placeholder="确认密码"
              class="form-control form-control-lg"
              v-model="newUser.password_again"
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
  name: "Register",
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password_again: ""
      },
      error: ""
    };
  },
  methods: {
    submit() {
      console.log(this.newUser.name);
      console.log(this.newUser.email);
      console.log(this.newUser.password);
      console.log(this.newUser.password_again);
    }
  }
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