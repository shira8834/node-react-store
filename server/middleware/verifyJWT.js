const jwt= require('jsonwebtoken')
const verifyJWT=(req,res, next)=>{
    console.log(req.headers);
    const authHeader= req.headers.authorization  || req.headers.Authorization 
    console.log({authHeader});
    console.log(typeof(authHeader));

    if(!authHeader?.startsWith('Bearer '))
        return res.status(401).json({message:'UnAuthentication'})
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode)=>{
            if(err) return res.status(403).json({message:"Forbidden"})
                req.user= decode
                next()

        })
}
module.exports=verifyJWT