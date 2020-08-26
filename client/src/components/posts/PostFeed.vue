<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-4">
        <img :src="post.avatar" alt class="img rounded-circle d-md-block m-auto" />
        <br />
        <div class="text-center">{{post.name}}</div>
      </div>
      <div class="col-8">
        <div class="mb-3">{{post.text}}</div>
        <div class="btnGroup">
          <button class="btn btn-light m-1">
            <i class="fas fa-thumbs-up text-info"></i>
            <span class="badge badge-light">{{post.likes.length}}</span>
          </button>
          <button class="btn btn-light m-1">
            <i class="text-secondary fas fa-thumbs-down"></i>
          </button>
          <a :href="post.html" class="btn btn-info m-1 text-white">鼓励留言</a>
          <button v-if="user!=null&&user.id==post.user" class="btn btn-danger m-1">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    post: Object,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
img {
  width: 180px;
}
@media (max-width: 767px) {
  img {
    width: 100%;
  }
}
</style>
