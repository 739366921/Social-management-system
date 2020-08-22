<template>
  <div class="create-profile">
    <div class="contianer p-3">
      <div class="row">
        <div class="col-md-5 m-auto">
          <a class="btn btn-light mt-1" @click.prevent="$router.go(-1)">返回</a>
          <h4 class="display-4 text-center">编辑个人信息</h4>
          <div class="d-block mb-1 text-muted small">*表示必填项</div>

          <!-- 表单 -->
          <form @submit.prevent="submit">
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
              info="请告知我们您目前所从事的岗位"
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
              placeholder="*编程语言技能"
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
            <TextArea
              name="bio"
              placeholder="自我介绍"
              v-model="msgInfo.bio"
              :error="errors.bio"
              info="请简单介绍一下自己"
            />

            <div class="mb-3">
              <button
                class="btn btn-light"
                @click.prevent="displaySocialInput=!displaySocialInput"
              >添加社交账号</button>
              <span class="text-muted">选项</span>
            </div>
            <div v-show="displaySocialInput">
              <InputGroup
                placeholder="微信公众号"
                name="wechat"
                v-model="msgInfo.wechat"
                :error="errors.wechat"
                icon="fab fa-weixin"
              />
            </div>
            <div v-show="displaySocialInput">
              <InputGroup
                placeholder="QQ"
                name="wechat"
                v-model="msgInfo.QQ"
                :error="errors.QQ"
                icon="fab fa-qq"
              />
              <div v-show="displaySocialInput">
                <InputGroup
                  placeholder="手机号码"
                  name="phone"
                  v-model="msgInfo.phone"
                  :error="errors.phone"
                  icon="fas fa-phone-square"
                />
              </div>
            </div>
            <div v-show="displaySocialInput">
              <InputGroup
                placeholder="腾讯课堂网址"
                name="tengxunkt"
                v-model="msgInfo.tengxunkt"
                :error="errors.tengxunkt"
                icon="fab fa-internet-explorer"
              />
            </div>
            <div v-show="displaySocialInput">
              <InputGroup
                placeholder="网易课堂网址"
                name="wangyikt"
                v-model="msgInfo.wangyikt"
                :error="errors.wangyikt"
                icon="fab fa-internet-explorer"
              />
            </div>

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
        company: "",
        status: "*请选择您的职业",
        website: "",
        location: "",
        skills: "",
        githubusername: "",
        QQ: "",
        wechat: "",
        phone: "",
        tengxunkt: "",
        wangyikt: "",
      },
      options: [
        { id: "0", value: "*请选择您的职业" },
        { id: "Front-end junior engineer", value: "前端初级工程师" },
        { id: "Front end senior engineer", value: "前端高级工程师" },
        { id: "Junior engineer at the back end", value: "后端初级工程师" },
        { id: "Back-end senior engineer", value: "后端高级工程师" },
        { id: "Full stack engineer", value: "全栈工程师" },
        { id: "architect", value: "架构师" },
        { id: "UI designer", value: "UI设计师" },
        { id: "personnel supervisor", value: "人事主管" },
        { id: "salesman", value: "业务员" },
        { id: "project manager", value: "项目经理" },
        { id: "testing personnel", value: "测试人员" },
        { id: "operation and maintenance staff", value: "运维人员" },
        { id: "financial executive", value: "财务主管" },
        { id: "teacher", value: "教师" },
        { id: "doctor", value: "医生" },
        { id: "lawyer ", value: "律师" },
      ],
      displaySocialInput: false,
      errors: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getCurrentProfile();
    });
  },
  methods: {
    submit() {
      // console.log(this.msgInfo);
      this.$axios
        .post("/api/profiles", this.msgInfo)
        .then((res) => {
          this.$store.dispatch("setProfile", res.data);
          this.$router.push("/dashboard");

          this.errors = {};
        })
        .catch((err) => {
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });
    },
    getCurrentProfile() {
      let profiles= this.$store.getters.profile;
      // console.log(profiles);
      profiles.company = profiles.company ? profiles.company : "";
      profiles.githubusername = profiles.githubusername ? profiles.githubusername : "";
      profiles.handle = profiles.handle ? profiles.handle : "";
      profiles.location = profiles.location ? profiles.location : "";
      profiles.status = profiles.status ? profiles.status : "";
      profiles.website = profiles.website ? profiles.website : "";
      profiles.bio = profiles.bio ? profiles.bio : "";

      profiles.skills = profiles.skills ? profiles.skills.join(","): "";

      profiles.social = profiles.social ? profiles.social : {};
      profiles.wechat = profiles.social.wechat? profiles.social.wechat: "";
      profiles.QQ = profiles.social.QQ ? profiles.social.QQ : "";
      profiles.phone = profiles.social.phone ? profiles.social.phone : "";
      profiles.tengxunkt = profiles.social.tengxunkt? profiles.social.tengxunkt: "";
      profiles.wangyikt = profiles.social.wangyikt? profiles.social.wangyikt : "";

      this.msgInfo = profiles;
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
