const mongoose = require('mongoose')
const bagSchema = new mongoose.Schema({

    userName:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    code:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Prod"
    },
    count :{
        type:String,
        default:1, 
    }
  
},{timestamps:true})

module.exports = mongoose.model('Bag',bagSchema )