<template>
  <h1 style="margin:10px">Dashboard登陆成功后才可见</h1>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      profile: null,
    };
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
  created() {
    this.getProfiledata();
  },
};
</script>

<style scoped>
</style>
