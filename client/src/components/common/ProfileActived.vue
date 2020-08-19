<template>
  <div class="btn-group mb-4">
    <router-link to="/edit-profile" class="btn_item btn btn-light">
      <i class="fas fa-user-circle" text-info mr-1></i>
      编辑个人信息
    </router-link>
    <router-link to="/add-profile" class="btn_item btn btn-light">
      <i class="fab fa-black-tie" text-info mr-1></i>
      添加个人经历
    </router-link>
    <router-link to="/add-education" class="btn_item btn btn-light">
      <i class="fas fa-graduation-cap" text-info mr-1></i>
      添加教育经历
    </router-link>
  </div>
</template>

<script>
</script>

<style scoped>
@media (max-width: 767px) {
  .btn_item {
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 10px;
    font-size: 13px;
  }
}
</style>
