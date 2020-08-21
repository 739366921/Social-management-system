<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="display-4">Dashboard</div>
          <p class="lead text-muted" v-if="user!=null">
            Welcome
            <router-link v-if="profile==null" to="/profiles">{{user.name}}</router-link>
            <router-link v-else  :to="`/profiles/${profile.handle}`">{{user.name}}</router-link>
            </p>
          <div v-if="profile!=null">
            <!-- 编辑个人信息--添加个人经历--添加教育经历 -->
            <ProfileActived />

            <!-- 展示个人履历 -->
            <Experience :experience="profile[0].experience" @deleteExperience="deleteExperience" />

            <!-- 展示教育经历 -->
            <Education :education="profile[0].education" @deleteEducation="deleteEducation" />
            

            <!-- 删除按钮 -->
            <div class="mb-5">
              <button class="btn btn-danger" @click.prevent="delectAccount">注销当前用户</button>
            </div>
          </div>
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
import ProfileActived from "./common/ProfileActived";
import Experience from "./common/Experience";
import Education from "./common/Education";
export default {
  name: "Dashboard",
  data() {
    return {
      profile: null,
      // usertext:null
    };
  },
  components: {
    ProfileActived,
    Experience,
    Education
  },
  computed: {
    user() {
      //  this.usertext=this.$store.getters.user
      // console.log(typeof(this.usertext));
      return this.$store.getters.user;
    },
  },
  methods: {
    getProfiledata() {
      this.$axios
        .get("api/profiles")
        .then((res) => {
          // console.log(res.data);
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
    delectAccount() {
      this.$axios
        .delete("/api/profiles")
        .then((res) => {
          this.profile = null;
          this.$store.dispatch("clearCurrentState");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteExperience(id) {
      this.$axios
        .delete(`/api/profiles/experience?experience_id=${id}`)
        .then((res) => {
          this.profile[0] = res.data
          this.$router.go(0)
          console.log(res.data);
          console.log(this.profile[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteEducation(id) {
      this.$axios
        .delete(`/api/profiles/education?education_id=${id}`)
        .then((res) => {
          this.profile[0] = res.data
          this.$router.go(0)
          console.log(res.data);
          console.log(this.profile[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // created() {
  //   this.getProfiledata();
  // },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getProfiledata();
    });
  },
};
</script>

<style scoped>
</style>