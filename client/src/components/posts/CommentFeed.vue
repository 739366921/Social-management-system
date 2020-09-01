<template>
  <div class="card card-body mt-2 mb-2">
    <div class="row">
      <div class="col-4">
        <img :src="comment.avatar" alt class="img rounded-circle d-md-block m-auto" />
        <br />
        <div class="text-center">{{comment.name}}</div>
      </div>
      <div class="col-8">
        <button
          @click="deleteClick(comment._id)"
          v-if="user!=null&&user.id==comment.user"
          class="btn btn-danger m-1 float-right"
        >
          <i class="fas fa-times"></i>
        </button>
        <div class="mb-3">{{comment.text}}</div>
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
    comment: Object,
    postId: String,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    deleteClick(id) {
      this.$axios
        .delete(
          `/api/posts/comments?increase_id=${this.postId}&comment_id=${this.comment._id}`
        )
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
