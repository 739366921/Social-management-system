<template>
    <div class="card card-body mt-2">
      <div class="row">
        <div class="col-4">
          <img :src="post.avatar" alt class="img rounded-circle d-md-block m-auto" />
          <br />
          <div class="text-center">{{post.name}}</div>
        </div>
        <div class="col-8">
          <div class="mb-3">{{post.text}}</div>
          <span v-if="showAction">
            <button @click="likeClick(post._id)" class="btn btn-light m-1">
              <i class="fas fa-thumbs-up text-info"></i>
              <span class="badge badge-light">{{post.likes.length}}</span>
            </button>
            <button @click="unlikeClick(post._id)" class="btn btn-light m-1">
              <i class="text-secondary fas fa-thumbs-down"></i>
            </button>
            <router-link :to="'/post/'+post._id" class="btn btn-info m-1 text-white">鼓励留言</router-link>
            <button
              @click="deleteClick(post._id)"
              v-if="user!=null&&user.id==post.user"
              class="btn btn-danger m-1"
            >
              <i class="fas fa-times"></i>
            </button>
          </span>
        </div>
      </div>
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
    showAction: Boolean,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    deleteClick(id) {
      this.$axios
        .delete(`/api/posts?posts_id=${id}`)
        .then((res) => {
          this.$emit("update");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    likeClick(id) {
      this.$axios
        .post(`/api/posts/like?like_id=${id}`)
        .then((res) => {
          this.$emit("update");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    unlikeClick(id) {
      this.$axios
        .post(`/api/posts/unlike?unlike_id=${id}`)
        .then((res) => {
          this.$emit("update");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
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
