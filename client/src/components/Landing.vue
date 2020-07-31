<template>
    <!-- Landing -->
  <div class="landing">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1 class="display-3 mb-4">社交管理系统
            </h1>
            <p class="lead"> 线上社交零距离，让远在千里变得近在咫尺 !</p>
            <hr />
            <router-link class="btn btn-lg btn-info mr-2" to="/register">注册</router-link>
            <router-link class="btn btn-lg btn-light text-dark" to="/login">登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'Landing',
   data () {
     return {
     }
   }
 }
</script>

<style scoped>
img {
  width: 100%;
}

.landing {
  position: relative;
  background: url('../assets/home_page.jpg') no-repeat;
  background-size:cover ;
  background-position: center;
  height: 100vh;
  margin-top: -25px;
  margin-bottom: -50px;
}

.landing-inner {
  padding-top: 100px;
}

.dark-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.container{
  position: center;

}
/* .card-form {
  opacity: 0.9;
} */

/* .latest-profiles-img {
  width: 40px;
  height: 40px;
} */

/* .form-control::placeholder {
  color: #bbb !important;
} */
</style>
