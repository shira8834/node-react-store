const { default: mongoose } = require('mongoose')
const mogoose= require('mongoose')
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch (err){
        console.log("error \n"+err);
    }
}
module.exports=connectDB