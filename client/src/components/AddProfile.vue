<template>
  <div class="section add-profile">
    <div class="conationer p-3">
      <div class="row">
        <div class="col-md-5">
          <button class="btn btn-light mt-1" @click.prevent="$router.go(-1)">返回</button>
          <div class="display-4 text-center">添加个人经历</div>
          <div class="lead text-center">填写有关于工作的任何经验</div>
          <small class="text-muted mb-1">*表示必填项</small>

          <!-- 表单 -->
          <form @submit.prevent="submit">
            <TextField
              type="text"
              name="title"
              placeholder="*工作内容"
              v-model="msgInfo.title"
              :error="errors.title"
            />
            <TextField
              type="text"
              name="company"
              placeholder="*公司"
              v-model="msgInfo.company"
              :error="errors.company"
            />
            <TextField
              type="text"
              name="location"
              placeholder="地点"
              v-model="msgInfo.location"
              :error="errors.location"
            />

            <h5>入职时间</h5>
            <TextField
              type="date"
              name="from"
              v-model="msgInfo.from"
              :error="errors.from"
            />
            <h5>离职时间</h5>
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
              <label for="current" class="form-check-label">当前在职</label>
            </div>
            <TextArea
              type="text"
              name="description"
              placeholder="工作描述"
              v-model="msgInfo.description"
              :error="errors.description"
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
  name: "AddProfile",
  data() {
    return {
      msgInfo: {
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
      },
      errors: {},
    };
  },
  methods: {
    submit() {
        if(this.msgInfo.current){
            this.msgInfo.to='在职'
        }
      this.$axios
        .post("/api/profiles/experience", this.msgInfo)
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
