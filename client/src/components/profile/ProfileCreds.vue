<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h4 class="text-center text-info mt-3">个人经历</h4>
        <ol class="list-group" v-for="(exp,index) in experience" :key="index">
          <li class="list-group-item mt-2">
            <p>
              <strong>{{exp.company}}</strong>
            </p>

            <p>
              <strong>在职时间：</strong>
              {{exp.from}}~{{exp.to}}
            </p>
            <p>
              <strong>职位：</strong>
              {{exp.title}}
            </p>

            <p>
              <strong>地点：</strong>
              {{exp.location}}
            </p>

            <p>
              <strong>岗位描述：</strong>
              {{exp.description}}
            </p>
          </li>
        </ol>
      </div>
      <div class="col-md-6">
        <h4 class="text-center text-info mt-3">教育经历</h4>
        <ol class=" list-group" v-for="(edu,index) in education" :key="index">
          <li class="list-group-item mt-2">
            <p>
              <strong>{{edu.school}}</strong>
            </p>

            <p>
              <strong>在校时间：</strong>
              {{edu.from}}~{{edu.to}}
            </p>

            <p>
              <strong>学历：</strong>
              {{edu.degree}}
            </p>

            <p>
              <strong>专业：</strong>
              {{edu.fieldofstudy}}
            </p>

            <p>
              <strong>在校经历：</strong>
              {{edu.description}}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCreds",
  data() {
    return {};
  },
  props: {
    experience: Array,
    education: Array,
  },
};
</script>

<style scoped>
</style>
