const isEmpty=(value)=>{
    return (
        value==undefined || value===null
        || (typeof(value)==='object'&&Object.keys(value).length==0) //Object.keys(value)方法会获取对象的键，生成数组输出
        || (typeof(value)==='string'&&value.trim().length==0)//trim()可以将字符串的空格删除之后输出
    )
}

module.exports=isEmpty