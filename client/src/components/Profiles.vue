<template>
  <div class="profiles">
    <div class="container p-2">
      <div class="col-12">
        <div class="btn btn-light mt-1 " @click.prevent="$router.go(-1)">返回个人信息</div>
      </div>
      <div class="row m-auto">
        <div class="col-md-12">
          <div class="display-4 text-center">交友卡片</div>
          <div class="lead text-center">让世界丰富多彩的你们</div>
          <div class="text-muted m-1">
            *头像要在
            <a href="//cn.gravatar.com/">//cn.gravatar.com/</a> 注册后才显示
          </div>
          <!-- 展示开发者信息 -->
          <div v-if="profiles.length>0">
            <ProfileItem
              v-for="profileItem in profiles"
              :key="profileItem._id"
              :profileItem="profileItem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileItem from "./common/ProfileItem";
export default {
  name: "Profiles",
  data() {
    return {
      profiles: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getProfiles();
    });
  },
  components: {
    ProfileItem,
  },
  methods: {
    getProfiles() {
      this.$axios
        .get("/api/profiles/all")
        .then((res) => {
          this.profiles = res.data;
        //   console.log(res.data);
          this.$store.dispatch("setProfiles", res.data);
        })
        .catch((err) => {
          this.profiles = [];
          this.$store.dispatch("setProfiles", []);
        });
    },
  },
};
</script>

<style scoped>
</style>
