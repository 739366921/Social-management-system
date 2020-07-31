const validator = require('validator');
const isEmpty=require('./is-empty')

module.exports=function validatorLoginInput(data){//data是外面传进来的ctx.request.body
    let errors={}

    //提前验证是否为空，然后设置为空
    data.email=!isEmpty(data.email)?data.email:''
    data.password=!isEmpty(data.password)?data.password:''


    if(!validator.isEmail(data.email))
    {
        errors.email='邮箱不合法'
    } 
     if(validator.isEmpty(data.email))
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
    
    
    return{
        errors,
        isvalid: isEmpty(errors)//判断是否为空
    }
}