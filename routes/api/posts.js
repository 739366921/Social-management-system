const Router = require("koa-router");
const router = new Router();

//引入passport
const Passport = require("koa-passport");

//引入模板实例
const Posts = require("../../models/posts");
const Profiles = require("../../models/profiles");

//引入自定义验证器
const validatorPostsInput = require("../../validation/posts");

/**
 * @route GET api/posts/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */

router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "posts works....." };
});

/**
 * @route POST api/posts
 * @desc 添加留言信息接口地址
 * @access 接口是私有的
 */

router.post(
  "/",
  Passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    //这里是负责校验input是否符合规范然后返回两个值
    const { errors, isvalid } = validatorPostsInput(ctx.request.body);

    //判断验证是否通过
    //因为有提示信息所以不通过时是false所以要取反进入，假如它为true证明input规范不用校验
    if (!isvalid) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }

    const newPosts = new Posts({
      text: ctx.request.body.text,
      name: ctx.request.body.name,
      avatar: ctx.request.body.avatar,

      user: ctx.state.user.id,
    });

    //存储到数据库里面
    await newPosts
      .save()
      .then((posts) => {
        ctx.body = posts;
      })
      .catch((err) => {
        ctx.body = err;
      });
    ctx.body = newPosts;
  }
);

/**
 * @route GET api/posts/all
 * @desc 获取所有留言信息接口地址
 * @access 接口是公开的
 */

router.get("/all", async (ctx) => {
  await Posts.find()
    .sort({ date: -1 }) //mongoDB语法-1代表倒叙
    .then((posts) => {
      ctx.status = 200;
      ctx.body = posts;
    })
    .catch((err) => {
      ctx.status = 404;
      ctx.body = { nopostsfound: "找不到任何留言信息" };
    });
});

/**
 * @route GET api/posts？post_id=id
 * @desc 获取所有留言信息接口地址
 * @access 接口是公开的
 */
//有问题，也是变量名问题,（已解决，92后面因为有多行要加上大括号，因为是一个函数，单行会默认执行不用加）

router.get("/", async (ctx) => {
  const posts_id = ctx.query.posts_id;
  await Posts.findById(posts_id)
    .then((post) => {
      ctx.status = 200;
      ctx.body = post;
    })
    .catch((err) => {
      ctx.status = 404;
      ctx.body = { nopostsfound: "找不到任何留言信息" };
    });
});

/**
 * @route DELETE api/posts?posts_id=id
 * @desc 删除单个留言接口地址
 * @access 接口是私有的
 */

router.delete(
  "/",
  Passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    //查看当前用户是否有个人信息
    const posts_id = ctx.query.posts_id;
    const profiles = await Profiles.find({ user: ctx.state.user.id });
    if (profiles.length > 0) {
      //查到有个人信息
      //查找此人留言
      const posts = await Posts.findById(posts_id);

      //判断是不是当前用户操作
      if (posts.user.toString() !== ctx.state.user.id) {
        ctx.status = 401;
        ctx.body = { notauthorized: "用户非法操作" };
        return;
      }

      await Posts.remove({ _id: posts_id }).then(() => {
        ctx.status = 200;
        ctx.body = { success: true };
      });
    } else {
      ctx.status = 404;
      ctx.body = { error: "个人信息不存在" };
    }
  }
);

/**
 * @route POST api/posts/like?like_id=id
 * @desc 添加点赞用户信息接口地址
 * @access 接口是私有的
 */
//有问题！！！ 142、146、160的变量名id，改为其他名会报错（已解决，关键142行query后面的变量名与postsman一样）
router.post(
  "/like",
  Passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    //检查是否有用户信息
    const like_id = ctx.query.like_id;
    const profiles = await Profiles.find({ user: ctx.state.user.id });
    if (profiles.length > 0) {
      //查找是否曾经有点赞
      const posts = await Posts.findById(like_id);
      const islike =
        posts.likes.filter((like) => like.user.toString() === ctx.state.user.id)
          .length > 0;

      //有点赞
      if (islike) {
        ctx.status = 400;
        ctx.body = { alreardyLike: "该用户已经点过赞" };
        return;
      }

      //没有点赞
      posts.likes.unshift({ user: ctx.state.user.id }); //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。

      const postsUpdate = await Posts.findOneAndUpdate(
        { _id: like_id },
        { $set: posts },
        { new: true } //默认返回原始的数据，需要将new属性设置为true，返回更新后的数据
      );
      ctx.body = postsUpdate;
    } else {
      ctx.status = 404;
      ctx.body = { error: "没有找到该用户profile" };
    }
  }
);

/**
 * @route POST api/posts/unlike?unlike_id=id
 * @desc 删除点赞用户信息接口地址
 * @access 接口是私有的
 */

router.post(
  "/unlike",
  Passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    //检查是否有用户信息
    const unlike_id = ctx.query.unlike_id;
    const profiles = await Profiles.find({ user: ctx.state.user.id });
    if (profiles.length > 0) {
      //查找是否曾经有点赞
      const posts = await Posts.findById(unlike_id);
      const islike =
        posts.likes.filter((like) => like.user.toString() === ctx.state.user.id)
          .length == 0;

      //没有点赞
      if (islike) {
        ctx.status = 400;
        ctx.body = { alreardyLike: "该用户没有点过赞" };

        return;
      }

      //有点赞，获取需要删除的user的id的index，并根据index删除对应点赞信息
      const unlike = posts.likes
        .map((item) => item.user.toString())
        .indexOf(unlike_id); //map()函数，它返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。
      posts.likes.splice(unlike, 1); //splice(index,个数)

      const postsUpdate = await Posts.findOneAndUpdate(
        { _id: unlike_id },
        { $set: posts }, //当成形参，是用来接收调用方法者传递的参数
        { new: true } //默认返回原始的数据，需要将new属性设置为true，返回更新后的数据
      );
      ctx.body = postsUpdate;
    } else {
      ctx.status = 404;
      ctx.body = { error: "没有找到该用户" };
    }
  }
);

/**
 * @route POST api/posts/comments?increase_id=id
 * @desc 添加用户评论信息接口地址
 * @access 接口是的私有
 */

router.post(
  "/comments",
  Passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const increase_id = ctx.query.increase_id;
    //查找需要被评论的id
    const posts = await Posts.findById(increase_id);

    const newcomment = {
      text: ctx.request.body.text,
      date: ctx.request.body.date,
      name: ctx.request.body.name,
      avatar: ctx.request.body.avatar,

      user: ctx.state.user.id,
    };
    //评论添加进去，一般评论都是时间最近评论在最前
    posts.comments.unshift(newcomment);

    const postsUpdate = await Posts.findOneAndUpdate(
      { _id: increase_id },
      { $set: posts }, //当成形参，是用来接收调用方法者传递的参数
      { new: true } //默认返回原始的数据，需要将new属性设置为true，返回更新后的数据
    );
    ctx.body = postsUpdate;
  }
);

/**
 * @route DELETE api/posts/comments?increase_id=id&comment_id=id
 * @desc 删除用户评论信息接口地址
 * @access 接口是的私有
 */

router.delete(
  "/comments",
  Passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const increase_id = ctx.query.increase_id;
    const comment_id = ctx.query.comment_id;
    //查找是否已经有评论过
    const posts = await Posts.findById(increase_id);
    const iscomment =
      posts.comments.filter((comment) => comment._id.toString() === comment_id)
        .length == 0;

    //没有评论
    if (iscomment) {
      ctx.status = 400;
      ctx.body = { alreardyComment: "该用户没有评论过" };

      return;
    }

    //查找需要删除的下标，map函数里面不是分行不能加大括号否则会出错，暂时不知道为什么
    const removeIndex = posts.comments
      .map((item) => item._id.toString())
      .indexOf(comment_id);
    //删除
    posts.comments.splice(removeIndex, 1);

    const postsUpdate = await Posts.findOneAndUpdate(
      { _id: increase_id },
      { $set: posts }, //当成形参，是用来接收调用方法者传递的参数
      { new: true } //默认返回原始的数据，需要将new属性设置为true，返回更新后的数据
    );
    ctx.body = postsUpdate;
  }
);

module.exports = router.routes();
