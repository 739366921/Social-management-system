<template>
  <div class="container">
    <div class="row">
      <div class="btn btn-light m-3" @click.prevent="$router.go(-1)">返回个人信息</div>
    </div>
    
    <ProfileHeader v-if="profile" :profile="profile" />

    <ProfileAbout v-if="profile" :profile="profile" />

    <ProfileCreds
      v-if="profile&&(profile.experience||profile.education)"
      :experience="profile.experience"
      :education="profile.education"
    />

    <ProfileGithub v-if="profile&&(profile.githubusername)" :username="profile.githubusername" />
  </div>
</template>

<script>
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
export default {
  name: "Profiles",
  data() {
    return {
      profile: null,
    };
  },
  components: {
    ProfileAbout,
    ProfileCreds,
    ProfileGithub,
    ProfileHeader,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getProfileByHandle(to.params.handle);
    });
  },
  methods: {
    getProfileByHandle(handle) {
      //   console.log(handle);
      this.$axios
        .get(`/api/profiles/handle?handle=${handle}`)
        .then((res) => {
          console.log(res.data);
          this.profile = res.data;
        })
        .catch((err) => {
          this.profile = null;
          console.log(err.response.data);
        });
    },
  },
};
</script>

<style scoped>
</style>
