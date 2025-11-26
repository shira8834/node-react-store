const mongoose = require('mongoose')
const prodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
            type:String,
            enum:['Pink', 'Yello'],
            default:"Pink",
        },
    code:{
        type:Number,
        required:true,
        unique:true
    },
    img:{
        type:String,
        required:true
    }
  
},{timestamps:true})

module.exports = mongoose.model('Prod',prodSchema )