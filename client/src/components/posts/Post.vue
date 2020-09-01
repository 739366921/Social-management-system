<template>
  <div class="container">
    <div class="row">
      <div class="col-3 mt-2">
        <button class="btn btn-light" @click.prevent="$router.go(-1)">返回</button>
      </div>
    </div>
    <!-- 展示个人评论组件 -->
    <PostFeed v-if="postData!=null" :post="postData" :showAction="false" />
    <!-- 展示填写评论组件 -->
    <div class="mt-2">
      <CommentForm v-if="postData!=null" :postId="postData._id" @update="getPost(postData._id)" />
    </div>
    <!-- 展示别人评论你的组件 -->
    <div v-if="postData!=null&&postData.comments.length>0">
      <CommentFeed
        v-for="comment in postData.comments"
        :key="comment._id"
        :comment="comment"
        :postId="postData._id"
        @update="getPost(postData._id)"
      />
    </div>
  </div>
</template>

<script>
import PostFeed from "./PostFeed";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
export default {
  name: "",
  data() {
    return {
      postData: null,
      errors: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getPost(to.params.id);
    });
  },
  components: {
    PostFeed,
    CommentForm,
    CommentFeed,
  },
  methods: {
    getPost(id) {
      this.$axios
        .get(`/api/posts?posts_id=${id}`)
        .then((res) => {
          this.postData = res.data;
          // console.log(this.postData);
          this.errors = {};
        })
        .catch((err) => {
          this.postData = null;
          this.errors = err.response.data;
        });
    },
  },
};
</script>

<style scoped>
</style>
