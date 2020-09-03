<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-body bg-info text-white mb-2">
        <div class="row justify-content-center mb-2">
          <img
            v-if="profile.user"
            :src="profile.user.avatar"
            class="rounded-circle"
            style="width:30% height:30%"
            alt
          />
        </div>
        <div class="text-center">
          <div v-if="profile.user" class="display-4 mb-2">{{profile.user.name}}</div>
          <div v-if="profile.status" class="text-center">{{profile.status}}</div>
          <div v-if="profile.company" class="text-center">{{profile.company}}</div>
          <div v-if="profile.location" class="text-center">{{profile.location}}</div>
          <p>
            <a v-if="profile.website" :href="profile.website" class="text-white p-1">
              <i class="fas fa-globe fa-2x"></i>
            </a>
            <a v-if="profile.social&&profile.social.wechat" class="text-white p-1">
              <i class="fab fa-weixin fa-2x"></i>
            </a>
            <a v-if="profile.social&&profile.social.phone" class="text-white p-1">
              <i class="fas fa-phone-square fa-2x"></i>
            </a>
            <a v-if="profile.social&&profile.social.QQ" class="text-white p-1">
              <i class="fab fa-qq fa-2x"></i>
            </a>
            <a v-if="profile.social&&profile.social.tengxunkt" class="text-white p-1">
              <i class="fab fa-internet-explorer fa-2x"></i>
            </a>
            <a v-if="profile.social&&profile.social.wangyikt" class="text-white p-1">
              <i class="fab fa-internet-explorer fa-2x"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileHeader",
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
