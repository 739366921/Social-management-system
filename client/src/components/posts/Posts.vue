<template>
  <div class="feed">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mt-2">
          <div>
            <PostForm/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "./PostForm";
export default {
  name: "Posts",
  data() {
    return {};
  },
  components: {
    PostForm,
  },
};
</script>

<style scoped>
</style>
