/*app文件*/
const Koa=require('koa')
const KoaRouter=require('koa-router')
const mongoose=require('mongoose')
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport')

//实例化koa
const app=new Koa()
const router=new KoaRouter()
//引入koa-bodyparser,用于解析body的中间件，不使用的话this.request.body是undefined; 使用的话，this.request.body是{}。
app.use(bodyParser());
//引入config
const db=require('./config/key').mongoURI
//引入user.js
const user=require('./routes/api/user')
//引入profiles.js
const profiles=require('./routes/api/profiles')
//引入posts.js
const posts=require('./routes/api/posts')



//连接mongoDB数据库
mongoose.connect(
    db,
    { useNewUrlParser: true,useUnifiedTopology: true}
    ).then(
        ()=>{
            console.log('mongodb connect success')
        })
    .catch((err)=>{console.log(err)})

//初始化passport
app.use(passport.initialize())
app.use(passport.session())


//回调config文件夹中passport文件
require('./config/passport')(passport)


//配置路由地址 localhost:5000/api/user 前缀，会去user文件找内容
router.use('/api/user',user)
router.use('/api/profiles',profiles)
router.use('/api/posts',posts)

//配置路由
app.use(router.routes()).use(router.allowedMethods())

//设置端口
const port=process.env.port||5000


//监听端口
app.listen(port,()=>{
    console.log(`sever start on ${port}`)
})


//路由跳转
router.get('/',async ctx=>{
    ctx.body={msg:'hello koa interface'}
})