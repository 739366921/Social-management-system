<template>
  <div>
    <hr />
    <h3 class="mb-4">Github仓库信息</h3>
    <div v-for="repo in repos" :key="repo.id" class="card card-body mb-2">
      <div class="row">
        <div class="col-md-6">
          <h4>
            <a :href="repo.html_url" class="text-info" target="_blank">{{repo.name}}</a>
          </h4>
          <p>{{repo.description}}</p>
        </div>
        <div class="col-md-6">
          <span class="badge badge-info mr-1">starts：{{repo.stargzers_count}}</span>
          <span class="badge badge-secondary mr-1">watchers{{repo.watchers_count}}</span>
          <span class="badge badge-success mr-1">forks{{repo.forks_count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileGithub",
  data() {
    return {
      clientId: "144ec1af008be7133b0c",
      client_secret: "2b806e887c9a786924ced7c484211ace2e771277",
      count: 0,
      sort: "created:desc",
      repos: [],
    };
  },
  props: {
    username: String,
  },
  created() {
    fetch(
      `https://api.github.com/users/${this.username}/repos?per_page=${this.count}&sort=${this.sort}&client_id=${this.clientId}&client_secret=${this.client_secret}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.repos = data;
      })
      .catch((err) => {
        console.log(err);
      });
    // this.$axios
    //   .get(
    //     `https://api.github.com/users/${this.username}/repos?per_page=${this.count}&sort=${this.sort}&client_id=${this.clientId}&client_secret=${this.client_secret}`
    //   )
    //   .then((res) => {
    //     this.repos = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>

<style scoped>
</style>
