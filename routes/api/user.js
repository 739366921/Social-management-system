const Router = require("koa-router");
const router = new Router();

//引入input验证文件
const validatorRegisterInput = require("../../validation/register");
const validatorLoginInput = require("../../validation/login");

//引入passport用于验证token
const passport = require("koa-passport");

//引入jsonwebtoken文件用于生成token
const jwt = require("jsonwebtoken");

//引入key文件统一管理
const keys = require("../../config/key");

//引入tools文件用于把加密后的密码存进数据库之后也是加密
const tools = require("../../config/tools");

//引入bcryptjs文件用于加密密码
const bcrypt = require("bcryptjs");

//引入gravatar文件用于获取全球公认头像
const gravatar = require("gravatar");

//引入Users文件
const users = require("../../models/Users");

/**
 * @route GET api/user/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */

router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "router works....." };
});

/**
 * @route POST api/user/register
 * @desc   注册接口地址
 * @access 接口是公开的
 */

router.post("/register", async (ctx) => {
  // console.log(ctx.request.body)

  //这里是负责校验input是否符合规范然后返回两个值
  const { errors, isvalid } = validatorRegisterInput(ctx.request.body);

  //判断验证是否通过
  //因为有提示信息所以不通过时是false所以要取反进入，假如它为true证明input规范不用校验
  if (!isvalid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  //储存到数据库
  const findResult = await users.find({ email: ctx.request.body.email });
  // console.log(findResult)

  //已查到
  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = { email: "邮箱已存在" };
  } else {
    const avatar = gravatar.url(ctx.request.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const newUsers = new users({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      avatar, //ES6语法
      password: tools.enbcrypt(ctx.request.body.password),
    });
    // console.log(newUsers)

    //存储到数据库里面
    await newUsers
      .save()
      .then((user) => {
        ctx.body = user;
      })
      .catch((err) => {
        console.log(err);
      });

    //返回json给客户端
    ctx.body = newUsers;
  }
});

/**
 * @route POST api/user/login
 * @desc   登陆接口地址    返回token
 * @access 接口是公开的
 */

router.post("/login", async (ctx) => {
  //查询用户是否存在
  const findResult = await users.find({ email: ctx.request.body.email });
  const user = findResult[0];
  const password = ctx.request.body.password;

  //这里是负责校验input是否符合规范然后返回两个值
  const { errors, isvalid } = validatorLoginInput(ctx.request.body);

  //判断验证是否通过
  //因为有提示信息所以不通过时是false所以要取反进入，假如它为true证明input规范不用校验
  if (!isvalid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  //判断查没查到
  if (findResult.length == 0) {
    ctx.status = 404;
    ctx.body = { email: "用户不存在" };
  } else {
    //查到后验证密码
    const result = bcrypt.compareSync(password, user.password);

    //验证通过
    if (result) {
      //返回token
      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }); //修改token有效时间

      ctx.statu = 200;
      ctx.body = { success: "true", token: "Bearer " + token }; //一定要写成一模一样 "Bearer空格"因为需要换行,不然会连在一起
    }
    //验证不通过
    else {
      ctx.status = 400;
      ctx.body = { password: "密码错误" };
    }
  }
});

/**
 * @route GET api/user/current
 * @desc   用户信息接口地址    返回用户信息
 * @access 接口是私密的
 */

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    ctx.body = {
      id: ctx.state.user.id, //state是用来给中间件保存数据的
      name: ctx.state.user.name,
      email: ctx.state.user.email,
      avatar: ctx.state.user.avatar,
    };
  }
);

module.exports = router.routes();
