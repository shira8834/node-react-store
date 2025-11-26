const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    name:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    phone:{
        type: String
    }, 
    roles:{
        type:String,
        enum:['User', 'Admin'],
        default:"User",
    }

},{timestamps:true})

module.exports=mongoose.model('User',userSchema)
