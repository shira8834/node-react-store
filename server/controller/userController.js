const bcrypt = require('bcrypt')
const User = require("../models/user")
const jwt= require('jsonwebtoken')
// const router= require("../routes/prodRoute")

const login = async (req, res) => {
    const {userName ,password}=req.body
    if(!userName || !password)
         return res.status(400).send(" userName,password are required")

    const foundUser= await User.findOne({userName}).lean()
    if(!foundUser)
        return res.status(401).json({message:"User does not exist."})

    const match=await bcrypt.compare(password, foundUser.password)
    if(!match)
        return res.status(401).json({message:"User does not exist."})
    

    const userInfo={_id:foundUser._id,name:foundUser.name,roles:foundUser.roles,userName:foundUser.userName,email:foundUser.email}
    const accessToken =jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})

    res.send("Logged in.")

}

const register = async (req, res) => {
    const { userName, password, name, email, phone } = req.body
    if (!userName || !password || !name)
        return res.status(400).send("name, userName,password are required")

    const duplicate = await User.findOne({userName:userName}).lean()
    if(duplicate)
        return res.status(409).json({message:"Duplicate userName"})

    const hashedPwd=await bcrypt.hash(password,10)
    const userObject={name,email,userName,phone,password:hashedPwd}
    const user = await User.create(userObject)
    if(user){
        return res.status(201).json({message:`New user ${userName} created`})
    }
    else{
        return res.status(400).json({message:'Invalid user received'})
    }
}


module.exports = { login, register }