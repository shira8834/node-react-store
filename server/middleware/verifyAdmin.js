const jwt= require('jsonwebtoken')
const verifyAdmin=(req,res, next)=>{
    console.log(req.user);
    if(req.user.roles!="Admin")
        return res.status(401).json({message:'No Admin'})
      next()

       
}
module.exports=verifyAdmin