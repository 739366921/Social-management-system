const validator = require('validator');
const isEmpty=require('./is-empty')

module.exports=function validatorExperienceInput(data){//data是外面传进来的ctx.request.body
    let errors={}

    //提前验证是否为空，然后设置为空
    data.title=!isEmpty(data.title)?data.title:''
    data.company=!isEmpty(data.company)?data.company:''
    data.from=!isEmpty(data.from)?data.from:''


     if(validator.isEmpty(data.title))
    {
        errors.title='工作内容不能为空'
    }

    if(validator.isEmpty(data.company))
    {
        errors.company='公司不能为空'
    }
    
    if(validator.isEmpty(data.from))
    {
        errors.from='入职时间不能为空'
    }
    
    
    return{
        errors,
        isvalid: isEmpty(errors)//判断是否为空
    }
}