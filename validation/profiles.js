const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatorProfilesInput(data) {
  //data是外面传进来的ctx.request.body
  let errors = {};

  //提前验证是否为空，然后设置为空
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 20 })) {
    errors.handle = "handle不能少于8位且不能大于20位";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "handle不能为空";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "当前状态不能为空";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "编程语言技能不能为空";
  }

  return {
    errors,
    isvalid: isEmpty(errors), //判断是否为空
  };
};
