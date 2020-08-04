const validator = require('validator');
const isEmpty=require('./is-empty')

module.exports=function validatorRegisterInput(data){//data是外面传进来的ctx.request.body
    let errors={}

    data.name=!isEmpty(data.name)?data.name:''
    data.email=!isEmpty(data.email)?data.email:''
    data.password=!isEmpty(data.password)?data.password:''
    data.password2=!isEmpty(data.password2)?data.password2:''

    if(!validator.isLength(data.name,{min:2 , max:30}))//超出范围为false，所以要取反进来
    {
        errors.name='名字不能小于2位且不能大于30位'
    }
    if(validator.isEmpty(data.name))//这里的isEmpty是对象validator的方法，跟下面自定义的不是同一个
    {
        errors.name='名字不能为空'
    } 


    if(!validator.isEmail(data.email))
    {
        errors.email='邮箱不合法'
    }
    if(validator.isEmpty(data.email))//全部都要最后校验里面为空的情况
    {
        errors.email='邮箱不能为空'
    }


    if(!validator.isLength(data.password,{min:8,max:20}))
    {
        errors.password='密码不能少于8位且不能大于20位'
    } 
    if(validator.isEmpty(data.password))
    {
        errors.password='密码不能为空'
    }


  
    if(!validator.equals(data.password,data.password2))
    {
        errors.password2='两次密码不一致！'
    }  
    if(validator.isEmpty(data.password2))
    {
        errors.password2='确认密码不能为空'
    }
    
    
    return{
        errors,
        isvalid: isEmpty(errors)//判断是否为空
    }
}