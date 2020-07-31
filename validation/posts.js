const validator = require('validator');
const isEmpty=require('./is-empty')

module.exports=function validatorPostsInput(data){//data是外面传进来的ctx.request.body
    let errors={}

    //提前验证是否为空，然后设置为空
    data.text=!isEmpty(data.text)?data.text:''

    if(!validator.isLength(data.text,{min:10,max:300}))
    {
        errors.text='text不能少于10位且不能大于300位'
    }  
    if(validator.isEmpty(data.text))
    {
        errors.text='text不能为空'
    }

    return{
        errors,
        isvalid: isEmpty(errors)//判断是否为空
    }
}