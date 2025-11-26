const express= require("express")
const router = express.Router()
const userController=require("../controller/userController")
const verifyJWT=require("../middleware/verifyJWT")

// router.use(verifyJWT)

// router.post("/login",verifyJWT,userController.login)//כניסה
// router.post("/register",verifyJWT,userController.register)//הרשמה

router.post("/login",userController.login)//כניסה
router.post("/register",userController.register)//הרשמה

module.exports=router