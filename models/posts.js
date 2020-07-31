const mongoose = require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    user:{//关联数据表
        type:String,
        ref: 'users',//填写需要关联的表名
        require:true
    },
    text:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
   avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,//Schema.Types是node中的数据类型，后面是可用类型
                ref:'users'
            }
        }
    ],
    comments:[
        {
            date:{
                type:Date,
                default:Date.now
            },
            text:{
                type:String,
                require:true
            },
            user:{
                type:Schema.Types.ObjectId,//Schema.Types是node中的数据类型，后面是可用类型
                ref:'users'
            },
            name:{
                type:String,
                require:true
            },
           avatar:{
                type:String
            },
        }
    ],
   date:{
        type:Date,
        default:Date.now
    }

})

module.exports=Posts=mongoose.model('posts',userSchema)