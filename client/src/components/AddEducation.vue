<template>
  <div class="section add-education">
    <div class="conationer p-3 ">
      <div class="row">
        <div class="col-md-5 m-auto">
          <button class="btn btn-light mt-1" @click.prevent="$router.go(-1)">返回</button>
          <div class="display-4 text-center">添加教育经历</div>
          <div class="lead text-center">您所毕业的学校，参加的培训等</div>
          <small class="text-muted mb-1">*表示必填项</small>

          <!-- 表单 -->
          <form @submit.prevent="submit">
            <TextField
              type="text"
              name="school"
              placeholder="*学校"
              v-model="msgInfo.school"
              :error="errors.school"
            />
            <TextField
              type="text"
              name="degree"
              placeholder="*学历"
              v-model="msgInfo.degree"
              :error="errors.degree"
            />
            <TextField
              type="text"
              name="fieldofstudy"
              placeholder="*专业"
              v-model="msgInfo.fieldofstudy"
              :error="errors.fieldofstudy"
            />

            <h5>入学时间</h5>
            <TextField type="date" name="from" v-model="msgInfo.from" :error="errors.from" />
            <h5>离校时间</h5>
            <TextField
              type="date"
              name="to"
              v-model="msgInfo.to"
              :error="errors.to"
              :disabled="msgInfo.current"
            />

            <div class="form-check mb-4">
              <input
                type="checkbox"
                name="current"
                class="form-check-input"
                v-model="msgInfo.current"
                id="current"
              />
              <label for="current" class="form-check-label">当前在校</label>
            </div>
            <TextArea
              type="text"
              name="description"
              placeholder="在校表现"
              v-model="msgInfo.description"
              :error="errors.description"
              info="说说你在学校期间的表现和经历"
            />
            <input type="submit" class="btn-block btn btn-info mt-4 mb-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "./common/TextFieldGroup";
import TextArea from "./common/TextAreaGroup";
export default {
  name: "AddEducation",
  data() {
    return {
      msgInfo: {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
      },
      errors: {},
    };
  },
  methods: {
    submit() {
      if (this.msgInfo.current) {
        this.msgInfo.to = "在校";
      }
      this.$axios
        .post("/api/profiles/education", this.msgInfo)
        .then((res) => {
          this.errors = "";
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });
    },
  },
    beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.msgInfo={};
    });
  },
  components: {
    TextField,
    TextArea,
  },
};
</script>

<style scoped>
</style>
