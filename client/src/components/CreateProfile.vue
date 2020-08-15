<template>
  <div class="create-profile">
    <div class="contianer">
      <div class="row">
        <div class="col-md-8 m-auto">
          <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
          <h4 class="display-4 text-center">创建个人信息</h4>
          <p class="lead text-center">填写您的个人信息，让我们更了解您</p>
          <div class="d-block pd-3 text-muted  small">*表示必填项</div>
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
    return {};
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
