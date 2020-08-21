const validator = require('validator');
const isEmpty=require('./is-empty')

module.exports=function validatorEducationInput(data){//data是外面传进来的ctx.request.body
    let errors={}

    //提前验证是否为空，然后设置为空
    data.school=!isEmpty(data.school)?data.school:''
    data.degree=!isEmpty(data.degree)?data.degree:''
    data.fieldofstudy=!isEmpty(data.fieldofstudy)?data.fieldofstudy:''


     if(validator.isEmpty(data.school))
    {
        errors.school='学校不能为空'
    }

    if(validator.isEmpty(data.degree))
    {
        errors.degree='学历不能为空'
    }
    
    if(validator.isEmpty(data.fieldofstudy))
    {
        errors.fieldofstudy='专业不能为空'
    }
    
    
    return{
        errors,
        isvalid: isEmpty(errors)//判断是否为空
    }
}