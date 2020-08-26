<template>
  <div class="feed">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mt-2">
          <div>
            <PostForm @update="getPosts" />
            <div class="card card-body mb-3">
              <PostFeed @update="getPosts" v-for="post in posts" :key="post._id" :post="post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      errors: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getPosts();
    });
  },
  methods: {
    getPosts() {
      this.$axios
        .get("/api/posts/all")
        .then((res) => {
          this.posts = res.data;
          console.log(this.posts);
        })
        .catch((err) => {
          this.errors = err.response.data;
        });
    },
  },
  components: {
    PostForm,
    PostFeed,
  },
};
</script>

<style scoped>
</style>
