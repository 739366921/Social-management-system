<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="display-4">Dashboard</div>
          <p class="lead text-muted" v-if="user!=null">Welcome{{user.name}}</p>
          <h4 v-if="profile!=null">Todo：数据显示</h4>
          <div v-else class="mb-3">
            <p>没有任何相关的个人信息，请添加您的个人信息</p>
            <router-link to="/create-profile" class="btn btn-lg btn-info">添加个人信息</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      profile: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    getProfiledata() {
      this.$axios
        .get("api/profiles")
        .then((res) => {
          console.log(res.data);
          this.profile = res.data;
          //更新store
          this.$store.dispatch("setProfile", this.profile);
        })
        .catch((err) => {
          console.log(err.response.data);
          //更新store
          this.$store.dispatch("setProfile", null);
        });
    },
  },
  // created() {
  //   this.getProfiledata();
  // },
  
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      vm.getProfiledata()
    })
  }
};
</script>

<style scoped>
</style>
