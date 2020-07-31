const Router=require('koa-router')
const router=new Router()

//引入input验证文件
const validatorProfilesInput=require('../../validation/profiles')
const validatorExperienceInput=require('../../validation/experience')
const validatorEducationInput=require('../../validation/education')


//引入passport
const Passport=require('koa-passport')

//引入模板实例
const Profiles=require('../../models/profiles')
const Users=require('../../models/Users')

/** 
 * @route GET api/profiles/test
 * @desc 测试接口地址
 * @access 接口是公开的
*/

router.get('/test',async ctx =>{
    ctx.status=200
    ctx.body={msg:'profiles works.....'}
})


/** 
 * @route GET api/profiles
 * @desc 个人信息接口地址
 * @access 接口是私密的
*/

router.get('/',Passport.authenticate('jwt', { session: false }),async ctx=>{
        // console.log(ctx.state.user)
        const profiles=await Profiles.find({user:ctx.state.user.id}).populate(
            'users',
            ['name',
            'avatar'])  //跨表联查 , populate的作用是查到id之后获取它的字段，populate（'模板名字'，[模板内所要查的不同字段]）

            // console.log(profile)
            if(profiles.length>0){
                ctx.status=200
                ctx.body=profiles
            }
            else{
                ctx.status=404
                ctx.body={noprofiles:"该用户没有任何相关的个人信息"}
            }
            return
})


/** 
 * @route POST api/profiles
 * @desc 添加和编辑个人信息接口地址
 * @access 接口是私密的
*/
 router.post('/',Passport.authenticate('jwt', { session: false }),async ctx=>{

  //这里是负责校验input是否符合规范然后返回两个值
  const{ errors,isvalid}=validatorProfilesInput(ctx.request.body)

  //判断验证是否通过
  //因为有提示信息所以不通过时是false所以要取反进入，假如它为true证明input规范不用校验
  if(!isvalid)
  {
      ctx.status=400
      ctx.body=errors
      return
  }

   const profilesFields={};
   profilesFields.user=ctx.state.user.id

   if(ctx.request.body.handle){
       profilesFields.handle=ctx.request.body.handle
   }
   if(ctx.request.body.company){
       profilesFields.company=ctx.request.body.company
   }
   if(ctx.request.body.website){
       profilesFields.website=ctx.request.body.website
   }
   if(ctx.request.body.location){
       profilesFields.location=ctx.request.body.location
   }
   if(ctx.request.body.status){
       profilesFields.status=ctx.request.body.status
   }


   //skills数据转换" html , css , javascripr , vue.js"
   if(ctx.request.body.skills!='undefined'){
    profilesFields.skills=ctx.request.body.skills.split(',')
}


   if(ctx.request.body.bio){
       profilesFields.bio=ctx.request.body.bio
   }
   if(ctx.request.body.githubusername){
       profilesFields.githubusername=ctx.request.body.githubusername
   }


    profilesFields.social={}

   if(ctx.request.body.wechat){
       profilesFields.social.wechat=ctx.request.body.wechat
   }
   if(ctx.request.body.QQ){
       profilesFields.social.QQ=ctx.request.body.QQ
   }
   if(ctx.request.body.tengxunkt){
       profilesFields.social.tengxunkt=ctx.request.body.tengxunkt
   }
    if(ctx.request.body.wangyikt){
    profilesFields.social.wangyikt=ctx.request.body.wangyikt
   }
   
   //查询数据库
   const profiles=await Profiles.find({user:ctx.state.user.id})
   if(profiles.length>0)
   {  
     //编辑更新
       const profileUpdate=await Profiles.findOneAndUpdate(
           {user:ctx.state.user.id},
           {$set:profilesFields},
           {new:true}
       )
       ctx.body=profileUpdate
   }
   else{
       await new Profiles(profilesFields).save().then(profiles=>{
           ctx.status=200
           ctx.body=profiles
       })
   }
})


/** 
 * @route GET api/profiles/handle?handle=test
 * @desc 通过handle获取个人信息接口地址
 * @access 接口是公开的
*/


router.get('/handle',async ctx=>{
    const errors={}
    const handle=ctx.query.handle
    // console.log(handle)
    const profiles=await Profiles.find({handle:handle}).populate('users',['name','avatar','email'])
    // console.log(profiles)
    if(profiles.length<1){
        ctx.status=404
        errors.noprofiles='未找到该用户信息'
        ctx.body=errors
    }
    else{
        ctx.body=profiles[0]
    }
})


/** 
 * @route GET api/profiles/all
 * @desc 获取所有个人信息接口地址
 * @access 接口是公开的
*/

router.get('/all',async ctx=>{
    const errors={}
    const profiles=await Profiles.find({}).populate('users',['name','avatar'])//可以输出users表中含有name和avatar字段的值（暂时输出不了）
    // console.log(profiles)
    if(profiles.length<1){
        ctx.status=404
        errors.noprofiles='未找到任何用户信息'
        ctx.body=errors
    }
    else{
        ctx.body=profiles
    }
})


/** 
 * @route POST api/profiles/experience
 * @desc 工作经历信息接口地址
 * @access 接口是私密的
*/

router.post('/experience',Passport.authenticate('jwt', { session: false }),async ctx=>{

    //这里是负责校验input是否符合规范然后返回两个值
    //这里已经定义了errors
    const{ errors,isvalid}=validatorExperienceInput(ctx.request.body)
  
    //判断验证是否通过
    //因为有提示信息所以不通过时是false所以要取反进入，假如它为true证明input规范不用校验
    if(!isvalid)
    {
        ctx.status=400
        ctx.body=errors
        return
    }
    
    //上面已经定义了errors这里不用重复定义
     const profilesFields={};
     profilesFields.experience=[]

     const profiles=await Profiles.find({user:ctx.state.user.id})

     if(profiles.length>0){
         const newExperience={
             title:ctx.request.body.title,
             company:ctx.request.body.company,
             location:ctx.request.body.location,
             from:ctx.request.body.from,
             to:ctx.request.body.to,
             description:ctx.request.body.description
         }
         profilesFields.experience.unshift(newExperience)

        //  console.log(profilesFields)
        const profileUpdate=await Profiles.update(//update()方法用于返回多个处理数据
            {user:ctx.state.user.id},
            {$push:{experience:profilesFields.experience}},//用于追加数据
            {$sort:1}//正序排列
        )
        // ctx.body=profileUpdate
        if(profileUpdate.ok==1){
            const profiles=await Profiles.find({
                user:ctx.state.user.id
            }).populate('users',['name','avatar'])

            if(profiles){
                ctx.status=200
                ctx.body=profiles
            }
        }
     }
     
     else{
         errors.noprofiles='没有该用户信息'
         ctx.status=404
         ctx.body=errors
     }

  })


  /** 
 * @route POST api/profiles/education
 * @desc 工作经历信息接口地址
 * @access 接口是私密的
*/

router.post('/education',Passport.authenticate('jwt', { session: false }),async ctx=>{

    //这里是负责校验input是否符合规范然后返回两个值
    //这里已经定义了errors
    const{ errors,isvalid}=validatorEducationInput(ctx.request.body)
  
    //判断验证是否通过
    //因为有提示信息所以不通过时是false所以要取反进入，假如它为true证明input规范不用校验
    if(!isvalid)
    {
        ctx.status=400
        ctx.body=errors
        return
    }
    
    //上面已经定义了errors这里不用重复定义
     const profilesFields={};
     profilesFields.education=[]

     const profiles=await Profiles.find({user:ctx.state.user.id})

     if(profiles.length>0){
         const newEducation={
            school:ctx.request.body.school,
            degree:ctx.request.body.degree,
            fieldofstudy:ctx.request.body.fieldofstudy,
            from:ctx.request.body.from,
            to:ctx.request.body.to,
            description:ctx.request.body.description
         }
         profilesFields.education.unshift(newEducation)

        //  console.log(profilesFields)
        //findOneAndUpdate()方法用于获取当前单个处理后的数据
        const profileUpdate=await Profiles.update(//update()方法用于返回多个处理数据
            {user:ctx.state.user.id},
            {$push:{education:profilesFields.education}},//用于追加数据
            {$sort:1}//正序排列
        )
        // ctx.body=profileUpdate
        if(profileUpdate.ok==1){
            const profiles=await Profiles.find({
                user:ctx.state.user.id
            }).populate('users',['name','avatar'])

            if(profiles){
                ctx.status=200
                ctx.body=profiles
            }
        }
     }
     
     else{
         errors.noprofiles='没有该用户信息'
         ctx.status=404
         ctx.body=errors
     }

  })


   /** 
 * @route DELETE api/profiles/experience?experience_id=id
 * @desc 删除工作经历信息接口地址
 * @access 接口是私密的
*/

router.delete('/experience',Passport.authenticate('jwt', { session: false }),async ctx=>{
        //拿到id
        const experience_id=ctx.query.experience_id
        console.log(experience_id)

        //查询
        const profiles=await Profiles.find({user:ctx.state.user.id})
        if(profiles[0].experience.length>0)
        {
            //找下标元素
            const removeIndex=profiles[0].experience.map(item=>item.id).indexOf(experience_id)
            
            //删除
            profiles[0].experience.splice(removeIndex,1)

            //更新数据库
            const profileUpdate=await Profiles.findOneAndUpdate(
            {user:ctx.state.user.id},
            {$set:profiles[0]},
            {new:true}
            )
        ctx.body=profileUpdate
    }
    else{
        ctx.status=404
        ctx.body={errors:'没有任何数据'}
    }

  })


   /** 
 * @route DELETE api/profiles/education?education_id=id
 * @desc 删除工作经历信息接口地址
 * @access 接口是私密的
*/

router.delete('/education',Passport.authenticate('jwt', { session: false }),async ctx=>{
        //拿到id
        const education_id=ctx.query.education_id

        //查询
        const profiles=await Profiles.find({user:ctx.state.user.id})
        if(profiles[0].education.length>0)
        {
            //找下标元素
            const removeIndex=profiles[0].education.map(item=>item.id).indexOf(education_id)
            
            //删除
            profiles[0].education.splice(removeIndex,1)

            //更新数据库
            const profileUpdate=await Profiles.findOneAndUpdate(
            {user:ctx.state.user.id},
            {$set:profiles[0]},
            {new:true}
            )
        ctx.body=profileUpdate
    }
    else{
        ctx.status=404
        ctx.body={errors:'没有任何数据'}
    }

  })



   /** 
 * @route DELETE api/profiles
 * @desc 删除整个用户接口地址
 * @access 接口是私密的
*/

router.delete('/',Passport.authenticate('jwt', { session: false }),async ctx=>{
        const profiles=await Profiles.deleteOne({user:ctx.state.user.id})//deleteOne代表删除当前查到的一个内容，是mongodb的方法
        if(profiles.ok==1){//profiles里面以后ok属性，代表找到且删除
            const users=await Users.deleteOne({_id:ctx.state.user.id})
            if(users.ok==1){//user里面也有ok属性
                ctx.status=200
                ctx.body={success:'已成功删除'}
            }
        }else{
            ctx.status=404
            ctx.body={errors:'profile不存在'}
        }
})
  

module.exports=router.routes()
