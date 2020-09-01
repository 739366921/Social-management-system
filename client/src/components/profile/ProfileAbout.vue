<template>
    <div class="card card-body bg-light col-md-12">
      <div class="row">
        <div class="col-md-12">
          <h4 class="text-center text-info mt-2">个人简介</h4>
          <div v-if="profile.bio" class="d-flex flex-wrap justify-content-center align-items-center p-2 lead">{{profile.bio}}</div>
          <div v-else>没有任何个人信息</div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-12">
          <h4 class="text-center text-info mt-2">个人技能</h4>
          <div v-if="profile.skills" class="d-flex flex-wrap justify-content-center align-items-center">
            <div v-for="(skill,index) in profile.skills" :key="index" class="p-3 "><i class="fas fa-check mr-2"></i>{{skill}}</div>
          </div>
          <div v-else>没有任何技能</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ProfileAbout",
  data() {
    return {};
  },
  props: {
    profile: Object,
  },
};
</script>

<style scoped>
</style>
