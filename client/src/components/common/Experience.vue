<template>
  <div class="experience">
    <h4 class="mb-2">个人履历</h4>
    <table class="table">
      <thead>
        <th>公司</th>
        <th>职位</th>
        <th>任职时间</th>
      </thead>
      <tbody>
        <tr v-for="exp in experience" :key="exp._id">
          <td>{{exp.company}}</td>
          <td>{{exp.title}}</td>
          <td>{{exp.from}}~{{exp.to}}</td>
          <td>
            <button @click="deleteExperience(exp._id)" class="btn btn-danger">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Experience",
  props: {
    experience: Array,
  },
  methods: {
    deleteExperience(id) {
       this.$emit('deleteExperience', id);;
    },
  },
};
</script>

<style scoped>
</style>
