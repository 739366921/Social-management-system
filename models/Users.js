const mongoose = require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
   avatar:{
        type:String
    },
   date:{
        type:Date,
        default:Date.now
    }

})

module.exports=Users=mongoose.model('users',userSchema)