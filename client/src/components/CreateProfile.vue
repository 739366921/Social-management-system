<template>
  <div class="create-profile">
    <div class="contianer p-3">
      <div class="row">
        <div class="col-md-5 m-auto">
          <a class="btn btn-light mt-1" @click.prevent="$router.go(-1)">返回</a>
          <h4 class="display-4 text-center">创建个人信息</h4>
          <p class="lead text-center">填写您的个人信息，让我们更了解您</p>
          <div class="d-block mb-1 text-muted small">*表示必填项</div>

          <!-- 表单 -->
          <form @click.prevent="submit">
            <TextField
              type="type"
              name="handle"
              placeholder="*Profile handle"
              v-model="msgInfo.handle"
              :error="errors.handle"
              info="此处的handle是在后端接口中需要用来查询数据的，通常写的是您email的名字"
            />
            <SelectList
              name="status"
              :error="errors.status"
              v-model="msgInfo.status"
              :options="options"
              info="请告诉我们您目前从事的职业"
            />
            <TextField
              type="type"
              name="company"
              placeholder="公司"
              v-model="msgInfo.company"
              :error="errors.company"
              info="可以是你自己的公司或者你的在职公司"
            />
            <TextField
              type="type"
              name="website"
              placeholder="网址"
              v-model="msgInfo.website"
              :error="errors.website"
              info="可以是你公司的网址或者你的在职公司网址"
            />
            <TextField
              type="type"
              name="location"
              placeholder="位置"
              v-model="msgInfo.location"
              :error="errors.location"
              info="你所在的城市及其所在区（例如：北京市昌平区）"
            />
            <TextField
              type="type"
              name="skills"
              placeholder="编程语言技能"
              v-model="msgInfo.skills"
              :error="errors.skills"
              info="请使用逗号隔开你所掌握的语言（例如：HTML，JS，CSS，PHP，JAVA）"
            />
            <TextField
              type="type"
              name="githubusername"
              placeholder="Github用户名"
              v-model="msgInfo.githubusername"
              :error="errors.githubusername"
              info="如果你希望将你的项目分享给大家，你可以填写你的github用户名"
            />

            <input type="submit" class="btn btn-info btn-block mt-4 mb-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "./common/TextFieldGroup";
import TextArea from "./common/TextAreaGroup";
import SelectList from "./common/SelectListGroup";
import InputGroup from "./common/InputGroup";
export default {
  name: "CreateProfile",
  data() {
    return {
      msgInfo: {
        handle: "",
        status: "*请选择您的职业",
      },
      options: [
        { label: "0", value: "*请选择您的职业" },
        { label: "Front-end junior engineer", value: "前端初级工程师" },
        { label: "Front end senior engineer", value: "前端高级工程师" },
        { label: "Junior engineer at the back end", value: "后端初级工程师" },
        { label: "Back-end senior engineer", value: "后端高级工程师" },
        { label: "Full stack engineer", value: "全栈工程师" },
        { label: "architect", value: "架构师" },
        { label: "UI designer", value: "UI设计师" },
        { label: "personnel supervisor", value: "人事主管" },
        { label: "salesman", value: "业务员" },
        { label: "project manager", value: "项目经理" },
        { label: "testing personnel", value: "测试人员" },
        { label: "operation and maintenance staff", value: "运维人员" },
        { label: "financial executive", value: "财务主管" },
        { label: "teacher", value: "教师" },
        { label: "doctor", value: "医生" },
        { label: "lawyer ", value: "律师" },
      ],

      errors: {},
    };
  },
  methods: {
    submit() {
      console.log("submit");
    },
  },
  components: {
    TextField,
    TextArea,
    SelectList,
    InputGroup,
  },
};
</script>

<style scoped>
</style>
