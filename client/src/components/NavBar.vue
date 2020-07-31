<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div class="container">
      <a class="navbar-brand text-light" to="/">前端小羊</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" to="/profiles"> 开发者
            </a>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item" >
            <a class="nav-link">注册</a>
          </li>
          <li class="nav-item" >
            <a class="nav-link" >登录</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
 export default {
   name: 'NavBar',
   data () {
     return {
     }
   }
 }
</script>

<style scoped>
.headerImg {
  width: 25px;
  margin-right: 5px;
}
</style>
