<template>
  <div class="post-form mb-3">
    <div class="card card-info mb-2">
      <div class="card-header bg-info text-white">给他留言</div>
      <form @submit.prevent="submit">
        <TextArea
          class="col-12 mt-2 mb-0"
          name="text"
          placeholder="随便写点东西 ... "
          v-model="text"
          :error="errors.text"
        />
        <input type="submit" class="btn btn-dark col-2 m-3" value="提交" />
      </form>
    </div>
  </div>
</template>

<script>
import TextArea from "../common/TextAreaGroup";
export default {
  name: "CommentForm",
  data() {
    return {
      text: "",
      errors: {},
    };
  },
  props: {
    postId: String,
  },
  methods: {
    submit() {
      let user = this.$store.getters.user;

      let newComment = {
        text: this.text,
        name: user.name,
        avatar: user.avatar,
      };
      //   console.log(newPost.text);

      this.$axios
        .post(`/api/posts/comments?increase_id=${this.postId}`, newComment)
        .then((res) => {
          this.errors = {};
          this.text = "";
          this.$emit("update");
        })
        .catch((err) => {
          this.errors = err.response.data;
        });
    },
  },
  components: {
    TextArea,
  },
};
</script>

<style scoped>
</style>
