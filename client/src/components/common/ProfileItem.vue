<template>
  <div class="profileItem">
    <div class="card card-body bg-light mb-3">
      <div class="row">
        <div class="col-md-2 col-4 text-center">
          <img :src="profileItem.user.avatar" alt class="rounded-circle" style="width:100%" />
        </div>
        <div class="col-md-6 col-8">
          <h4 class="text-md-left text-center" v-if="profileItem.handle!=undefined">{{profileItem.handle}}</h4>
          <div class="mb-2" v-if="profileItem.status!=undefined">职位：{{profileItem.status}}</div>
          <div class="mb-2" v-if="profileItem.location!=undefined">位置：{{profileItem.location}}</div>
          <div class="mb-2" v-if="profileItem.bio!=undefined">个人简介：{{profileItem.bio}}</div>
          <router-link :to="`/profile/${profileItem.handle}`" class="btn btn-info mb-2">更多消息</router-link>
        </div>
        <div class="col-md-4" v-if="profileItem.skills.length>0">
            <h6>技能：</h6>
          <ul class="list-group">
            <li class="list-group-item" v-for="(skill,index) in profileItem.skills" :key="index">
              <i class="fa fa-check"></i>
              {{skill}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    profileItem: Object,
  },
};
</script>

<style scoped>
</style>
